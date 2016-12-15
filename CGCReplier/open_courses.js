(function() {

  window.replyCheck = window.replyCheck || {};

  replyCheck.Courses = function() {
    this.Blender = [
        'course/blender-basics/', 'course/mesh-modeling-fundamentals/',
        'course/introduction-to-texturing/', 'course/shading-fundamentals-in-cycles/',
        'course/fundamentals-of-rigging/', 'course/fundamentals-of-animation/',
        'course/fundamentals-of-dynamics/', 'course/fundamentals-of-lighting/',
        'course/introduction-to-rendering/', 'course/fundamentals-of-compositing/',
        'course/modeling-with-modifiers/', 'course/fundamentals-of-digital-sculpting/',
        'course/introduction-to-retopology/', 'course/modeling-video-game-assets-in-blender/',
        'course/texturing-game-assets-with-blender/'
    ];
    this.Concept = [
      'course/digital-painting-basics/', 'course/lighting-and-values/',
      'course/lighting-and-values-2/', 'course/color-course-understanding-color/',
      'course/introduction-to-materials-and-texture/', 'course/the-perspective-course/',
      'course/tools-of-the-trade/', 'course/important-drawing-tips/',
      'course/complete-drawing-timelapses-and-inspiration-lectures/',
      'course/creating-the-game-asset-concept-art/'
    ];
    this.Sculpt = [
      'course/sculpting-basics/', 'course/fundamentals-sculpting-with-clay/',
      'course/introduction-to-human-anatomy-and-basic-proportions/',
      'course/introduction-to-mold-making-and-molding-techniques/',
      'course/introduction-to-casting-casting-techniques/'
    ];
    this.Unity = [
      'course/unity-basics-introduction-for-beginners/', 'course/fundamentals-of-the-unity-interface/',
      'course/fundamentals-of-materials-and-textures/', 'course/fundamentals-of-lighting-2/',
      'course/fundamentals-of-physics/', 'course/fundamentals-of-ui-design/',
      'course/fundamentals-of-2d-development/', 'course/fundamentals-of-particle-systems/',
      'course/fundamentals-of-terrain-generation/', 'course/fundamentals-of-tree-creation/',
      'course/fundamentals-of-pathfinding/', 'course/fundamentals-of-image-effects/',
      'course/fundamentals-of-mecanim-animation/', 'course/fundamentals-of-rigged-animations/',
      'course/fundamentals-of-game-publishing/', 'course/fundamentals-of-weapon-mechanics/',
      'course/fundamentals-of-fps-ui-design/', 'course/using-game-assets-in-unity/'
    ];
    this.BlenderLesson = [];
    this.ConceptLesson = [];
    this.SculptLesson = [];
    this.UnityLesson = [];
  };

  // placeholder for adding courses
  replyCheck.Courses.prototype = {
    forEach: function(cb) {
        cb();
    },
    setCourse: function(replies) {
      // set
    },
    removeCourse: function(reply) {
      // remove
    },
    findCourse: function(reply) {
      // find?
    }
  };

  replyCheck.getCourses = function() {
    var background = chrome.extension.getBackgroundPage();
    if (!background.replyCheck.hasOwnProperty("openCourses"))
      background.replyCheck.openCourses = new replyCheck.Courses;
    return background.replyCheck.openCourses;
  };
})();
