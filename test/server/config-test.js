var buster = require("buster");
var config = require("../../lib/Config")

buster.testCase("fs-config Tests", {
  setUp: function(){
  },
  
  "local config": {
    "sync": {
      setUp: function() {
        this.config = config.initSync('./test/files', 'local', 'reference');
      },

      "equal to defaults" : function() {
        assert.equals("value1", this.config.env["env1"]);
        assert.equals("value2", this.config.env["env2"]);
        assert.equals("value3", this.config.env["env3"]);
        assert.equals("value4OverrideReference", this.config.env["env4"]);
        assert.equals("value5OverrideReference", this.config.env["env5"]);
        assert.equals("value6OverrideReference", this.config.env["env6"]);
        assert.equals("value7OverrideReference", this.config.env["env7"]);
        assert.equals("value8OverrideReference", this.config.env["env8"]);
      }
    },
    "async": {
      setUp: function(done) {
        this.config = config.init('./test/files', 'local', 'reference', function(){
          done();
        });
      },

      "equal to defaults" : function() {
        assert.equals("value1", this.config.env["env1"]);
        assert.equals("value2", this.config.env["env2"]);
        assert.equals("value3", this.config.env["env3"]);
        assert.equals("value4OverrideReference", this.config.env["env4"]);
        assert.equals("value5OverrideReference", this.config.env["env5"]);
        assert.equals("value6OverrideReference", this.config.env["env6"]);
        assert.equals("value7OverrideReference", this.config.env["env7"]);
        assert.equals("value8OverrideReference", this.config.env["env8"]);
      }
    }
  },
  
  "dev config": {
    setUp: function(done) {
      this.config = config.init('./test/files', 'dev', 'reference', function(){
        done();
      });
    },
    
    "equal to dev values" : function() {
      assert.equals("value1OverrideDefaultDev", this.config.env["env1"]);
      assert.equals("value2", this.config.env["env2"]);
      assert.equals("value3", this.config.env["env3"]);
      assert.equals("value4OverrideReference", this.config.env["env4"]);
      assert.equals("value5OverrideReferenceDev", this.config.env["env5"]);
      assert.equals("value6OverrideReference", this.config.env["env6"]);
      assert.equals("value7OverrideReference", this.config.env["env7"]);
      assert.equals("value8OverrideReference", this.config.env["env8"]);
      
      assert.equals("value1OverrideReferenceDev", this.config.env["devOnly1"]);
      assert.equals("value2", this.config.env["devOnly2"]);
    }
  },
  
  "test config": {
    setUp: function(done) {
      this.config = config.init('./test/files', 'test', 'reference', function(){
        done();
      });
    },
    
    "equal to test values" : function() {
      assert.equals("value1", this.config.env["env1"]);
      assert.equals("value2OverrideDefaultTest", this.config.env["env2"]);
      assert.equals("value3", this.config.env["env3"]);
      assert.equals("value4OverrideReference", this.config.env["env4"]);
      assert.equals("value5OverrideReference", this.config.env["env5"]);
      assert.equals("value6OverrideReferenceTest", this.config.env["env6"]);
      assert.equals("value7OverrideReference", this.config.env["env7"]);
      assert.equals("value8OverrideReference", this.config.env["env8"]);
      
      assert.equals("value1OverrideReferenceTest", this.config.env["testOnly1"]);
      assert.equals("value2", this.config.env["testOnly2"]);
    }
  },
  
  "prod config": {
    setUp: function(done) {
      this.config = config.init('./test/files', 'prod', 'reference', function(){
        done();
      });
    },
    
    "equal to test values" : function() {
      assert.equals("value1", this.config.env["env1"]);
      assert.equals("value2", this.config.env["env2"]);
      assert.equals("value3OverrideDefaultProd", this.config.env["env3"]);
      assert.equals("value4OverrideReference", this.config.env["env4"]);
      assert.equals("value5OverrideReference", this.config.env["env5"]);
      assert.equals("value6OverrideReference", this.config.env["env6"]);
      assert.equals("value7OverrideReferenceProd", this.config.env["env7"]);
      assert.equals("value8OverrideReference", this.config.env["env8"]);
      
      assert.equals("value1OverrideReferenceProd", this.config.env["prodOnly1"]);
      assert.equals("value2", this.config.env["prodOnly2"]);
    }
  }
});