(function() {
  // background script
  // reply list getter/setter and list
  window.replyCheck = window.replyCheck || {};

  // Adding methods and array to object
  replyCheck.Courses = function() {
    this.courseList = [
        'course/blender-basics/', 'course/mesh-modeling-fundamentals/',
        'course/introduction-to-texturing/', 'course/shading-fundamentals-in-cycles/',
        'course/fundamentals-of-rigging/', 'course/fundamentals-of-animation/',
        'course/fundamentals-of-dynamics/', 'course/fundamentals-of-lighting/',
        'course/introduction-to-rendering/', 'course/fundamentals-of-compositing/',
        'course/modeling-with-modifiers/', 'course/fundamentals-of-digital-sculpting/',
        'course/introduction-to-retopology/'
    ];
    this.Concept = [];
    this.Sculpt = [];
    this.Unity = [];
  };

  replyCheck.Courses.prototype = {
    forEach: function(cb) {
      // for (var reply of need._questionList)
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
})();
