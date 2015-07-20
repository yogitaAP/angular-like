function Scope(){
    this.$$watchers = [];
}

Scope.prototype.$watch = function(watcherFn, listenerFn){
    var watcher = {
        watcherFn : watcherFn,
        listenerFn : listenerFn
    };
    watcher.oldValue = watcherFn(this);
    this.$$watchers.push(watcher);
};

Scope.prototype.$digest = function(){
    var self = this;
    this.$$watchers.forEach(function(watcher){
        var newValue = watcher.watcherFn(self);
        if (watcher.oldValue !== newValue){
            watcher.listenerFn(newValue, watcher.oldValue);
            watcher.oldValue = newValue;
        }
    });
}

Scope.prototype.$apply = function(fn){
    try {
        fn();
    } 
    finally {
        this.$digest();
    }
    
};