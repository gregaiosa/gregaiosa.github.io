---
layout: page
title: 1 DOF Robot Gripper Optimized for Haptic Feedback
description: A custom 1 Degree of Freedom (DOF) robotic gripper adapted to fit the <strong>SO-101</strong>, designed specifically for high-fidelity <strong>haptic feedback</strong>, maximizing backdriveability and minimizing backlash.
img: assets/img/gripper_thumbnail_placeholder.png
importance: 2
github: https://github.com/gregaiosa/1DOF_Gripper
# category: work
---

<h2>Summary</h2>

Developed a custom 1 Degree of Freedom (DOF) robotic gripper optimized for haptic applications. Based on a modification of the SO-101 design, the gripper prioritizes maximum backdriveability and minimized backlash, enabling precise force feedback and tactile interaction for the user.

<div class="mt-3 mb-4">
    <span class="badge badge-pill badge-info z-depth-1">Onshape</span>
    <span class="badge badge-pill badge-info z-depth-1">3D Printing</span>
    <span class="badge badge-pill badge-info z-depth-1">ROS 2</span>
    <span class="badge badge-pill badge-info z-depth-1">Python</span>
    <span class="badge badge-pill badge-info z-depth-1">SocketCAN</span>
    <span class="badge badge-pill badge-info z-depth-1">Transparency</span>
    <span class="badge badge-pill badge-info z-depth-1">Bilateral Teleoperation</span>
    <span class="badge badge-pill badge-info z-depth-1">Haptic Feedback</span>
    <span class="badge badge-pill badge-info z-depth-1">Quassi-Direct-Drive</span>


</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/GripperMainVideo.mp4" title="Gripper operation demonstration" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
    </div>
</div>
<div class="caption mt-2">
    Demonstration of the gripper's operation and backdriveability.
</div>

<h2 class="mt-2 mb-3">Mechanical Design</h2>
<div class="mt-3">
    <ul>
        <li><strong>SO-101 Modification:</strong> Adapted the gripper to the SO-101 architecture to better suit high-fidelity haptic feedback requirements.</li>
        <li><strong>Mechanical Specifications:</strong> The gripper weighs ~195 grams and features a maximum jaw opening of 140 mm. The transmission uses a low gear ratio of ~1.2.</li>
        <li><strong>Quassi-Direct-Drive Actuation:</strong> Uses CubeMars GL40 II gimbal brushless motors without a gearbox, ensuring an instantaneous and crisp haptic response.</li>
        <li><strong>Maximizing Backdriveability:</strong> The lack of a gearbox and the use of tendons, timing belts, and a linkage, minimizes friction and inertia. This is further enhanced by active Coulomb friction compensation in software to improve backdriving by the user.</li>
    </ul>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/isometric_gripper.png" title="Gripper CAD Model" class="img-fluid rounded z-depth-0" %}
    </div>
</div>
<div class="caption mt-2">
    Onshape CAD model of the modified SO-101 arm and gripper.
</div>

<h2>System Modeling & Dynamics</h2>
<div class="mt-3">
    <ul>
        <li><strong>Dynamic Simulation:</strong> Developed an idealized dynamic model using Python (<code>scipy.signal</code>) to analyze the gripper's frequency response and optimize it for haptic feedback.</li>
        <li><strong>Bandwidth Optimization:</strong> Evaluated transfer functions (Jaw Torque to Displacement, Velocity, and Acceleration) across various Gear Ratios (G) and Inertia Ratios (N) to maximize the system's velocity bandwidth.</li>
        <li><strong>Design Validation:</strong> The Bode plot and contour analysis mathematically validated the choice of a quasi-direct-drive configuration (low G) to minimize reflected inertia (calculated at 1.98 × 10<sup>-5</sup> kg/m<sup>2</sup>) and mechanical damping, ensuring high transparency.</li>
    </ul>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/gripper_heatmap.png" title="System Bandwidth Analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption mt-2">
    Simulated velocity bandwidth as a function of Gear Ratio (G) and Inertia Ratio (N).
</div>

<h2>Haptic Feedback Performance</h2>
<div class="mt-3">
    <ul>
        <li><strong>Bilateral Teleoperation:</strong> Implemented a 1:1 Leader-Follower setup using MIT mode control. The leader mirrors the position of the follower while directly reflecting the follower's measured torque back to the user's hand.</li>
        <li><strong>Force & Backlash Characteristics:</strong> Capable of delivering a pinch force of ~2.5 N before the tendons slip (an SO-101 hardware limitation). The measured static friction is ~1 N or ~0.06 Nm at the jaw, and total backlash is ~2.4 mm at the jaw tip (1.45 degrees at the pivot).</li>
        <li><strong>Transparency:</strong> The low friction direct-drive system, combined with 1kHz SocketCAN control loops, allows the user to feel remote interactions with minimal interference from the hardware itself.</li>
        <li><strong>Current-Based Homing:</strong> Designed a sensorless homing routine that detects physical hard-stops by monitoring current spikes when the jaws close.</li>
    </ul>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Haptic_Transparency_Plot_crop_caption.png" title="Force vs Displacement" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption mt-2">
    Force response curve.
</div>

<h2>System Architecture & Control</h2>
<div class="mt-3">
    <ul>
        <li><strong>Control Loop:</strong> Operates a 1kHz control loop using MIT mode over a SocketCAN interface. This high-frequency loop applies position tracking with KD damping and feedforward torque commands for haptic feedback.</li>
        <li><strong>ROS 2 Integration:</strong> The entire gripper and SO-101 arm system is wrapped in a unified ROS 2 node, allowing seamless integration with broader robotic software stacks and standardized message interfaces.</li>
    </ul>
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gripper.svg" title="Control Architecture" class="img-fluid rounded z-depth-0" %}
    </div>
</div>
<div class="caption mt-2">
    Control block diagram. 
</div>

<h2>Discussion</h2>
<div class="mt-3">
    <p>The project demonstrated a feasible way to add a gripper with usable haptics inexpensively to a 5 DOF robot arm. This can be used to grab both soft and hard objects and help train VLA models. Due to the use of low-cost manufacturing techniques like FDM 3D printing, there is more play in the system than is desirable. Future work would design a robot arm in tandem with the gripper to ensure the gripper transmission method is well supported. </p>
</div>

<h2>Open Source Files</h2>
The CAD files for the mechanical design are publicly available for reference and modification.

<a href="[INSERT_ONSHAPE_LINK]" class="btn z-depth-0" role="button">View CAD on Onshape</a>
<a href="https://github.com/gregaiosa/1DOF_Gripper" class="btn z-depth-0" role="button">View Code on GitHub</a>
