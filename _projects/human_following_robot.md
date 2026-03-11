---
layout: page
title: Human Following Robot
description: Integrating YOLO and SLAM with a Clearpath Robotics Jackal to locate and track a specific person while listening to gesture-based commands.
img: assets/video/following_video_cropped.mp4
importance: 2
github: https://github.com/gregaiosa/robot-follower
# category: work
---

<h2>Summary</h2>

An autonomous human-following system implemented on a Clearpath Jackal mobile robot. Utilizing <strong>ROS 2</strong> and <strong>YOLO</strong> pose detection, the robot dynamically tracks, pursues, and navigates toward a designated person in real-time without relying on wearable sensors or tags.

<div class="mt-3 mb-4">
    <span class="badge badge-pill badge-info z-depth-1">ROS 2</span>
    <span class="badge badge-pill badge-info z-depth-1">Python</span>
    <span class="badge badge-pill badge-info z-depth-1">YOLO26</span>
    <span class="badge badge-pill badge-info z-depth-1">Nav2</span>
    <span class="badge badge-pill badge-info z-depth-1">SLAM Toolbox</span>
    <span class="badge badge-pill badge-info z-depth-1">Clearpath Jackal</span>
    <span class="badge badge-pill badge-info z-depth-1">Intel RealSense</span>
    <span class="badge badge-pill badge-info z-depth-1">Velodyne LiDAR</span>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/following_video.mp4" title="Human following robot demonstration" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
    </div>
</div>

<h2 class="mt-2 mb-3">System Architecture</h2>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Human_Following_Robot.svg" title="System Architecture" class="img-fluid rounded z-depth-0" %}
    </div>
</div>

<h2 class="mt-2 mb-3">Key Capabilities</h2>

<h3>Vision-Based Tracking</h3>
<ul>
<li>Leverages <strong>YOLO</strong> to identify the target and continuously orients the robot to keep the person centered within the camera frame.</li>
<li>Uses a <strong>RealSense d435i</strong> to gather the RGB image and the depth data to determine the robot's distance to the person.</li>
</ul>

<h3>Gesture Control</h3>
<ul>
<li>Recognizes and responds to visual gesture commands, allowing the user to initiate or halt the following behavior hands-free.</li>
<li>Utilizes YOLO's pose detection trained on the <strong>Hand Keypoints</strong> dataset to track individual keypoints and convert them into commands.</li>
</ul>

<h3>Autonomous Navigation & Obstacle Avoidance</h3>
<ul>
<li>Safely maneuvers through environments, calculating dynamic paths to the target while preventing collisions.</li>
<li>Remains approximately 1 meter away from the person to give them space and keep them in the camera frame.</li>
<li>Integrated the <strong>Nav2</strong> stack, <strong>SLAM Toolbox</strong>, and a <strong>Velodyne LiDAR</strong> sensor to achieve this.</li>
</ul>

<h3>Search & Reacquisition</h3>
<ul>
<li>If line-of-sight is broken, the system calculates the target's last known position to autonomously explore and reacquire visual contact.</li>
<li>When the person can no longer be found at their last known position, the robot spins in place in the direction the person left the camera frame.</li>
</ul>


<style>
  /* Forces the exact 3:4 width ratio for equal heights */
  .vid-4-3 { flex: 0 0 42.85%; max-width: 42.85%; }
  .vid-16-9 { flex: 0 0 57.15%; max-width: 57.15%; }
  
  /* Ensures videos stack on top of each other on mobile screens */
  @media (max-width: 576px) {
    .vid-4-3, .vid-16-9 { flex: 0 0 100%; max-width: 100%; }
  }
</style>

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0 vid-4-3">
        {% include video.liquid path="assets/video/robot_pov.mp4" title="Robot vision" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
    </div>
    <div class="col-sm mt-3 mt-md-0 vid-16-9">
        {% include video.liquid path="assets/video/nav_map.mp4" title="Navigation map" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
    </div>
</div>

<div class="caption">
    (Left) Robot point of view while tracking. (Right) Robot planning and navigation.
</div>

<h2>Discussion</h2>
The tracking system performed reliably, especially considering all processing was executed onboard a 4th-generation i5 CPU. The project successfully proved the feasibility of dynamic, markerless human tracking using only onboard vision and SLAM. Future iterations would benefit from upgraded compute hardware to allow for higher-frequency pose processing and more aggressive dynamic tracking.

<a href="https://github.com/gregaiosa/robot-follower" class="btn z-depth-0" role="button">View Code on GitHub</a>
