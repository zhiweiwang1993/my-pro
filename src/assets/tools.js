export default {
   getCache:function(key){
       return JSON.parse(window.localStorage.getItem(key)) || {}
   },
   setCache:function(key,value){
       window.localStorage.setItem(key,JSON.stringify(value))
   }
}