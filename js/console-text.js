Function.prototype.getMultiLine = function () {
    var lines = new String(this);
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    return lines;
}
var string = function () {

/*

 ######  ########  
##    ## ##     ## 
##       ##     ## 
 ######  ########  
      ## ##     ## 
##    ## ##     ## 
 ######  ########  
           
 */

}
window.console.log(string.getMultiLine());