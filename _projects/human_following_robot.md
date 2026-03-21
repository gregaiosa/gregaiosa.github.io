---
layout: page
title: Human Following Robot
description: Integrating YOLO and SLAM with a Clearpath Robotics Jackal to locate and track a specific person while listening to gesture-based commands.
img: assets/video/following_video_cropped.mp4
importance: 1
github: https://github.com/gregaiosa/robot-follower
# category: work
---

<h2>Summary</h2>

Implemented autonomous human-following on a Clearpath Jackal mobile robot. The system uses <strong>ROS 2</strong> and <strong>YOLO</strong> pose detection to dynamically track, pursue, and navigate toward a designated person in real-time without relying on wearable sensors or tags.

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
        {% include video.liquid path="assets/video/following_video_both.mp4" title="Human following robot demonstration" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
    </div>
</div>

<h2 class="mt-2 mb-3">System Architecture</h2>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Human_Following_Robot_blue.svg" title="System Architecture" class="img-fluid rounded z-depth-0" %}
    </div>
</div>


<h2>Vision-Based Tracking</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-7">
        <ul>
            <li>Deploys <strong>YOLO</strong> to identify the target and continuously orients the robot to keep the person centered within the camera frame.</li>
            <li>Extracts RGB and depth data via a <strong>RealSense d435i</strong> to continuously calculate the robot's distance to the person.</li>
        </ul>
    </div>
    
    <div class="col-sm-5 mt-3 mt-sm-0">
        {% include video.liquid path="assets/video/robot_pov.mp4" title="Robot vision" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
        <div class="caption mt-2">
            Robot point of view while tracking.
        </div>
    </div>
</div>

<h2>Gesture Control</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-6">
        <ul>
            <li>Recognizes and responds to visual gesture commands, allowing the user to initiate or halt the following behavior hands-free.</li>
            <li>Maps individual joint keypoints to specific control commands through YOLO pose detection, trained on the <strong>Hand Keypoints</strong> dataset.</li>
        </ul>
    </div>
    
    <div class="col-sm-6 mt-3 mt-sm-0">
        <div class="row">
            <div class="col-6">
                {% include video.liquid path="assets/video/follow_gesture.mp4" title="Follow gesture command" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
                <div class="caption mt-2">
                    Initiate follow.
                </div>
            </div>
            <div class="col-6">
                {% include video.liquid path="assets/video/stop_gesture.mp4" title="Stop gesture command" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
                <div class="caption mt-2">
                    Wait command.
                </div>
            </div>
        </div>
    </div>
</div>

<h2>Autonomous Navigation & Obstacle Avoidance</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-7">
        <ul>
            <li>Safely maneuvers through environments, calculating dynamic paths to the target while preventing collisions.</li>
            <li>Remains approximately 1 meter away from the person to give them space and keep them in the camera frame.</li>
            <li>Integrates the <strong>Nav2</strong> stack, <strong>SLAM Toolbox</strong>, and a <strong>Velodyne LiDAR</strong> sensor to achieve reliable spatial awareness.</li>
        </ul>
    </div>
    
    <div class="col-sm-5 mt-3 mt-sm-0">
        {% include video.liquid path="assets/video/obstacle_avoidance.mp4" title="Navigation map" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
        <div class="caption mt-2">
            Robot planning and navigation.
        </div>
    </div>
</div>

<h2>Search & Reacquisition</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-7">
        <ul>
            <li>If line-of-sight is broken, the system calculates the target's last known position to autonomously explore and reacquire visual contact.</li>
            <li>Initiates a rotational search pattern in the direction the person exited the frame if they are no longer detected at their last known coordinates.</li>
        </ul>
    </div>
    
    <div class="col-sm-5 mt-3 mt-sm-0">
        {% include video.liquid path="assets/video/reacquisition.mp4" title="Target reacquisition search" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
        <div class="caption mt-2">
            Autonomous search pattern.
        </div>
    </div>
</div>

<h2>Discussion</h2>
The tracking performed reliably, especially considering all processing was executed onboard a 4th-generation i5 CPU. The project successfully proved the feasibility of dynamic, markerless human tracking using only onboard vision and SLAM. Future iterations would benefit from upgraded compute hardware to allow for higher-frequency pose processing and more aggressive dynamic tracking.

<a href="https://github.com/gregaiosa/robot-follower" class="btn z-depth-0" role="button">View Code on GitHub</a>
