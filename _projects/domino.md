---
layout: page
title: Robot Domino Artist
description: Developed a Python ROS 2 package for a Franka Emika Robot arm to find and manipulate dominoes.
img: assets/img/Squiggle_Placement_cropped.png
importance: 1
# category: work
github: https://github.com/gregaiosa/Robot-Domino-Artist
---
<h2>Summary</h2>

This project uses the Franka Emika Robot (FER) to manipulate dominoes into several preset patterns. Using a computer vision algorithm, the robot records the positions of the dominoes and then arranges them into the goal positions before initiating the toppling sequence.

To avoid collisions, the algorithm reorients the domino before placing it in the final position. Due to the variable height of the workspace surface, force-based placement was implemented to ensure reliable contact with the surface. 

The project relies on an accurate extrinsic calibration of the camera. The camera was calibrated in-hand using <code>easy_handeye2</code>, and the resulting calibration was used throughout the manipulation pipeline.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/domino_squiggle_portfolio.mp4" title="example image" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
    </div>
</div>
<div class="caption">
    This video shows the full system performing domino placement followed by a toppling sequence once all dominoes reach their goal poses.
</div>

<h2>System Architecture</h2>

<h3>Domino Movement Algorithm</h3>

The domino movement algorithm is the core routine responsible for moving dominoes from their initial positions to the final pattern. Each domino follows a three-stage process:
<ol>
    <li>Initial pickup from the table</li>
    <li>Staging and reorientation into a standing configuration</li>
    <li>Final placement into the goal pose</li>
</ol>
The staging step is critical due to the small size of the dominoes and the geometry of the gripper. Attempting to place dominoes directly from a lying configuration resulted in collisions with neighboring dominoes. Reorienting them first enabled safe and repeatable placement. 

<h3>Domino Vision Algorithm</h3>
The vision pipeline identifies the pose of each domino on the table and publishes these poses to the TF tree when requested by the manipulation node. 
<ol>
    <li><strong>Position Identification:</strong> Color filtering is used to detect domino centers in the image, and depth data is combined with camera intrinsics to compute 3D positions. </li>
    <li><strong>Orientation Identification:</strong> Bounding boxes are used to estimate the domino’s orientation about the vertical axis, which is converted into a quaternion. </li>
</ol>

This approach assumes the camera is perpendicular to the table and that the table surface is flat. In practice, these assumptions were imperfect and introduced small pose errors that accumulated during placement. 

<h3>Force-Controlled Placement</h3>
To compensate for inaccuracies in table height and vision estimation, force-controlled placement was implemented. During pickup and placement, the robot lowers the gripper until the measured joint effort exceeds a threshold, indicating contact with the table.

This eliminated hard-coded height values and significantly increased the robustness of the system. Implementing this behavior required temporarily disabling collision objects for the table and dominoes to prevent planning failures during forced contact.

While this required careful management of collision objects and scene state, it ultimately turned discrepancies between simulation and the real world into a tool rather than a limitation. 


*Contributors: Gregory Aiosa, Michael Jenz, Daniel Augustin, Chenyu Zhu*

<a href="https://github.com/gregaiosa/Robot-Domino-Artist" class="btn z-depth-0" role="button">View Code on GitHub</a>