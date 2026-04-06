---
layout: page
title: EKF SLAM from Scratch
description: Built an <strong>EKF SLAM</strong> system in <strong>C++</strong> and <strong>ROS 2</strong> from scratch, including a custom <strong>2D rigid-body geometry library</strong>, a <strong>physics-based simulator</strong> with Gaussian noise, wheel slip, and collision detection, and a <strong>LiDAR landmark detection pipeline</strong> using unsupervised clustering and circle regression. Implemented the full Extended Kalman Filter SLAM loop with both known and unknown data association.
img: assets/video/EKF_SLAM.mp4
importance: 3
github: https://github.com/gregaiosa/ekf_slam
# category: work
---


<div class="mt-3 mb-4">
    <span class="badge badge-pill badge-info z-depth-1">ROS 2</span>
    <span class="badge badge-pill badge-info z-depth-1">C++</span>
    <span class="badge badge-pill badge-info z-depth-1">EKF SLAM</span>
    <span class="badge badge-pill badge-info z-depth-1">Armadillo</span>
    <span class="badge badge-pill badge-info z-depth-1">TurtleBot 3</span>
    <span class="badge badge-pill badge-info z-depth-1">LiDAR</span>
    <span class="badge badge-pill badge-info z-depth-1">RViz2</span>
</div>

<div class="row justify-content-center">
    <div class="col-sm-8">
        {% include video.liquid path="assets/video/EKF_SLAM.mp4" title="EKF SLAM Simulation" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
    </div>
</div>

<h2 class="mt-2 mb-3">System Architecture</h2>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/EKF_SLAM.svg" title="System Architecture" class="img-fluid rounded z-depth-0" %}
    </div>
</div>


<h2>turtlelib</h2>
<p>
    A ROS-independent custom C++ library that serves as the mathematical foundation for the entire system. All geometry, kinematics, and twist math are implemented here, keeping calculations cleanly separated from ROS node mechanics.
</p>
<ul>
    <li><strong>SE(2) transforms</strong> — Rigid body transformations in 2D, including composition,
    inversion, and adjoint operations. Points and twists can be expressed in any frame.</li>
    <li><strong>Twist integration</strong> — Computes the exact <code>Transform2D</code> corresponding
    to a body following a constant twist for one time unit, handling both pure rotation and
    simultaneous translation and rotation.</li>
    <li><strong>Differential drive kinematics</strong> — A <code>DiffDrive</code> class implements
    forward kinematics (wheel positions → robot configuration) and inverse kinematics
    (desired body twist → wheel velocities), throwing an exception on impossible-to-follow twists.</li>
    <li><strong>Unit tested with Catch2</strong> — Every function has at least one test case,
    including approximate floating-point comparisons and edge cases like pure rotation and
    simultaneous translation.</li>
</ul>

<h2>Simulator (nusim)</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-7">
        <p>
            A full-featured 2D physics simulator that acts as a stand-in for the real robot,
            providing ground truth state while injecting realistic sensor imperfections.
        </p>
        <ul>
            <li><strong>Gaussian input noise</strong> — Zero-mean noise is added to non-zero commanded
            wheel velocities, modeling motor imprecision.</li>
            <li><strong>Wheel slip</strong> — Uniform random slip is applied independently to each wheel,
            causing the reported encoder positions to diverge from the true wheel motion.</li>
            <li><strong>Collision detection</strong> — The robot is represented as a circle. On intersection
            with a cylindrical obstacle, the robot is pushed to a tangent position while the wheels
            continue spinning simulating the real behavior of a robot bumping into an obstacle.</li>
            <li><strong>Simulated LiDAR</strong> — Ray-casting against obstacle cylinders and arena walls
            at 5 Hz, with configurable noise, range, and angular resolution matching the real
            TurtleBot 3 LiDAR sensor.</li>
            <li><strong>Fake sensor</strong> — Publishes noisy relative <em>(x, y)</em> measurements of
            landmarks with unique IDs, used for known-data-association testing during SLAM development.</li>
        </ul>
    </div>
    <div class="col-sm-5 mt-3 mt-sm-0">
        {% include figure.liquid path="assets/img/sim_rviz.png" title="Nusim Environment" class="img-fluid rounded z-depth-1" width="100%" %}
        <div class="caption mt-2">
            Simulator environment with obstacles (red), walls, and simulated LiDAR scan.
        </div>
    </div>
</div>

<h2>LiDAR Landmark Detection</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-7">
        <p>
            A three-stage pipeline converts raw 2D LiDAR scan data into detected landmark positions,
            enabling SLAM to run without pre-placed fiducials or sensor tags.
        </p>
        <ul>
            <li><strong>Clustering</strong> — Consecutive scan points within a distance threshold are
            grouped into clusters. The scan wraps around, so clusters spanning the 0°/360° boundary
            are handled explicitly. Clusters with fewer than 3 points are discarded.</li>
            <li><strong>Circle regression</strong> — The Hyper circle-fitting algorithm fits a circle
            to each cluster using algebraic least squares with SVD decomposition.</li>
            <li><strong>Radius filtering</strong> — Fitted circles outside the expected obstacle radius
            range (1–10 cm) are rejected, preventing walls and other large features from being
            classified as landmarks.</li>
        </ul>
    </div>
    <div class="col-sm-5 mt-3 mt-sm-0">
        {% include figure.liquid path="assets/img/landmark_detection.png" title="Landmark Detection" class="img-fluid rounded z-depth-1" width="100%" %}
        <div class="caption mt-2">
            Detected landmarks (yellow) overlaid on the simulated environment.
        </div>
    </div>
</div>

<h2>EKF SLAM</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-7">
        <p>
            The core SLAM algorithm maintains a joint state estimate of the robot pose and all
            landmark positions, fusing odometry predictions with landmark observations using an
            Extended Kalman Filter.
        </p>
        <ul>
            <li><strong>Predict step</strong> — On each odometry update, the robot's pose estimate
            is propagated forward using the <code>DiffDrive</code> forward kinematics. The covariance
            matrix grows, reflecting increased uncertainty between sensor updates.</li>
            <li><strong>Update step</strong> — Each detected landmark measurement triggers a linearized
            Kalman update. The Jacobian of the measurement model is computed analytically and used to
            correct both the robot pose and the landmark positions simultaneously.</li>
            <li><strong>Known data association</strong> — Validated first using the simulator's
            <code>fake_sensor</code> topic, which provides landmark IDs directly. Driving into
            obstacles to corrupt odometry confirmed the filter's ability to recover correct
            landmark positions even under large drift.</li>
            <li><strong>Unknown data association</strong> — Extended to real LiDAR data using
            Mahalanobis distance gating. New observations that fall outside the gate distance
            for all known landmarks are initialized as new landmarks in the map.</li>
            <li><strong>ROS REP 105 compliance</strong> — Publishes a <code>map → odom</code>
            transform such that the full <code>map → odom → base_footprint</code> chain
            reflects the SLAM-corrected robot pose.</li>
        </ul>
    </div>
    <div class="col-sm-5 mt-3 mt-sm-0">
        {% include figure.liquid path="assets/img/slam_result.png" title="EKF SLAM Result" class="img-fluid rounded z-depth-1" width="100%" %}
        <div class="caption mt-2">
            End of closed-loop run: ground truth (red), odometry (blue), and SLAM estimate (green).
        </div>
    </div>
</div>

<h2>Results</h2>
<p>
    After a closed-loop circuit with noise enabled and a limited landmark detection radius,
    the SLAM estimate substantially outperformed raw odometry. Final pose error after one loop:
</p>
<ul>
    <li><strong>Odometry</strong> — x: 0.159 m, y: 0.033 m, θ: –0.338 rad</li>
    <li><strong>SLAM estimate</strong> — x: 0.005 m, y: -0.002 m, θ: 0.111 rad</li>
</ul>



<a href="https://github.com/gregaiosa/ekf_slam" class="btn z-depth-0" role="button">View Code on GitHub</a>
