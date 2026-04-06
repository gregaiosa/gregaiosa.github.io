// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-projects",
    title: "Projects",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-resume",
          title: "Resume",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/_pages/resume.html";
          },
        },{id: "nav-email",
          title: "Email",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/_pages/email.html";
          },
        },{id: "nav-linkedin",
          title: "LinkedIn",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/_pages/linkedin.html";
          },
        },{id: "nav-github",
          title: "Github",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/_pages/github.html";
          },
        },{id: "nav-about",
          title: "About",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/about/";
          },
        },{id: "projects-robot-domino-artist",
          title: 'Robot Domino Artist',
          description: "Developed a Python ROS 2 package for a Franka Emika Robot arm to find and manipulate dominoes. Utilized OpenCV to detect the dominoes and implemented force control for precise placement.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/domino/";
            },},{id: "projects-ekf-slam-from-scratch",
          title: 'EKF SLAM from Scratch',
          description: "Built an EKF SLAM system in C++ and ROS 2 from scratch, including a custom 2D rigid-body geometry library, a physics-based simulator with Gaussian noise, wheel slip, and collision detection, and a LiDAR landmark detection pipeline using unsupervised clustering and circle regression. Implemented the full Extended Kalman Filter SLAM loop with both known and unknown data association.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ekf_slam/";
            },},{id: "projects-human-following-robot",
          title: 'Human Following Robot',
          description: "Integrating YOLO and SLAM with a Clearpath Robotics Jackal to locate and track a specific person while listening to gesture-based commands.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/human_following_robot/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/Gregory_Aiosa_Resume.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%67%72%65%67%6F%72%79.%61%69%6F%73%61@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/gregaiosa", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/gregory-aiosa", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
