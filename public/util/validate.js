
//  判断两次密码是否相同
function validate_password(alerttxt){
  if(p_again.value==null || p_again.value== ''){
    alert(alerttxt);return false;
  }
  else if(p_again.value!==password.value){
    alert('两次密码不一致')
    return false;
  }
  else {
    tip.style.display = 'none';return true;
  }
}

//  判断账号密码是否为空
function validate_required(field,alerttxt){
  if (field.value==null||field.value=="")
    {alert(alerttxt);ajaxFlag = false;return false}
  else {ajaxFlag = true;return true}
}
//  判断账号是否合法
function validata_unable(field,alerttxt){
  var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";  
  var re = new RegExp(regu);
  if (re.test(field.value)){
    ajaxFlag = true;
    return true;
  }else{
    alert(alerttxt);
    ajaxFlag = false;
    return false;
  }
}
//  判断账号是否超过字数
function validata_overlong(field,alerttxt){
  if (field.value.length>10)
    {alert(alerttxt,"warning");ajaxFlag = false;return false}
  else {ajaxFlag = true;return true}
}
function validate_form(thisform){
  if (validata_overlong(thisform.username,"用户名不能超过10个字符")==false)
   {thisform.username.focus();ajaxFlag = false;return false}
  if (validate_required(thisform.username,"用户名不能为空")==false)
   {thisform.username.focus();ajaxFlag = false;return false}
  if (validata_unable(thisform.username,"用户名必须由中文、数字或字母组成")==false)
   {thisform.username.focus();ajaxFlag = false;return false}
  if (validate_required(thisform.password,"密码不能为空")==false)
   {thisform.password.focus();ajaxFlag = false;return false}
  if (validata_unable(thisform.password,"密码必须由数字或字母组成")==false)
   {thisform.username.focus();ajaxFlag = false;return false}
  if (validate_password("请再一次输入密码")==false)
   {p_again.focus();ajaxFlag = false;return false}
  ajaxFlag = true;
  return false;
}