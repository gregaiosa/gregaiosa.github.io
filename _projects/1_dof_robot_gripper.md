---
layout: page
title: 1 DOF Robot Gripper Optimized for Haptic Feedback
description: A custom 1 Degree of Freedom (DOF) robotic gripper modified from the <strong>SO-101</strong>, designed specifically for high-fidelity <strong>haptic feedback</strong>, maximizing backdriveability and minimizing backlash.
img: assets/img/gripper_thumbnail_placeholder.png
importance: 2
github: [INSERT_GITHUB_LINK]
# category: work
---

<h2>Summary</h2>

Developed a custom 1 Degree of Freedom (DOF) robotic gripper optimized for haptic applications. Based on a modification of the SO-101 design, the gripper prioritizes maximum backdriveability and minimized backlash, enabling precise force feedback and tactile interaction for the user.

<div class="mt-3 mb-4">
    <span class="badge badge-pill badge-info z-depth-1">Onshape</span>
    <span class="badge badge-pill badge-info z-depth-1">3D Printing</span>
    <!-- Add more technology badges here as needed (e.g., Python, C++, Microcontrollers) -->
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/gripper_demo_placeholder.mp4" title="Gripper operation demonstration" class="img-fluid rounded z-depth-1" controls=true autoplay=true loop=true muted=true width="100%" %}
    </div>
</div>
<div class="caption mt-2">
    Demonstration of the gripper's operation and backdriveability. <em>(Placeholder: Add a video showing the gripper moving smoothly when pushed manually to demonstrate backdriveability)</em>
</div>

<h2 class="mt-2 mb-3">Mechanical Design</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-7">
        <ul>
            <li><strong>SO-101 Modification:</strong> Adapted the proven SO-101 architecture to better suit high-fidelity haptic feedback requirements.</li>
            <li><strong>Minimizing Backlash:</strong> <em>[Placeholder: Add details on how backlash was reduced in the transmission/gearing or joints to ensure a crisp feel]</em>.</li>
            <li><strong>Maximizing Backdriveability:</strong> <em>[Placeholder: Add details on the actuator choice or mechanical advantages used to ensure low friction and easy backdriving by the user]</em>.</li>
        </ul>
    </div>
    
    <div class="col-sm-5 mt-3 mt-sm-0">
        {% include figure.liquid loading="eager" path="assets/img/gripper_cad_placeholder.png" title="Gripper CAD Model" class="img-fluid rounded z-depth-0" %}
        <div class="caption mt-2">
            Onshape CAD model of the modified SO-101 gripper. <em>(Placeholder: Add a render or screenshot of the CAD model)</em>
        </div>
    </div>
</div>

<h2>Haptic Feedback Performance</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-5 mt-3 mt-sm-0">
        {% include figure.liquid loading="eager" path="assets/img/force_graph_placeholder.png" title="Force vs Displacement" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">
            Force response curve. <em>(Placeholder: Add a graph showing Force vs. Displacement, commanded vs. actual torque, or step-response data)</em>
        </div>
    </div>
    
    <div class="col-sm-7">
        <ul>
            <li><strong>Force Rendering:</strong> <em>[Placeholder: Describe how forces are commanded and rendered to the user to simulate physical objects or springs]</em>.</li>
            <li><strong>Transparency:</strong> The low friction and inertia allow the user to feel the virtual environment with minimal interference from the hardware itself.</li>
            <li><strong>Data Analysis:</strong> <em>[Placeholder: Discuss the results shown in the adjacent graph and what they mean for the haptic performance]</em>.</li>
        </ul>
    </div>
</div>

<h2>System Architecture & Control</h2>
<div class="row mt-3 align-items-center">
    <div class="col-sm-7">
        <ul>
            <li><strong>Control Loop:</strong> <em>[Placeholder: Mention the control frequency, e.g., 1kHz, and the type of control loop used (PID, current control, etc.)]</em>.</li>
            <li><strong>Hardware:</strong> <em>[Placeholder: List the microcontrollers, motor drivers, and sensors (like encoders or current sensors) used in the system]</em>.</li>
        </ul>
    </div>
    <div class="col-sm-5 mt-3 mt-sm-0">
        {% include figure.liquid loading="eager" path="assets/img/architecture_placeholder.png" title="Control Architecture" class="img-fluid rounded z-depth-0" %}
        <div class="caption mt-2">
            Control block diagram. <em>(Placeholder: Add a diagram showing the microcontroller, motor driver, and feedback loop architecture)</em>
        </div>
    </div>
</div>

<h2>Open Source Files</h2>
The CAD files for the mechanical design are publicly available for reference and modification.

<a href="[INSERT_ONSHAPE_LINK]" class="btn z-depth-0" role="button">View CAD on Onshape</a>
<a href="[INSERT_GITHUB_LINK]" class="btn z-depth-0" role="button">View Code on GitHub</a>
