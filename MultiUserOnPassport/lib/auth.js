module.exports = {
    isOwner: function(request, response){
        if(request.user){ //로그인 되어 있으면 유저 객체가 있을 것이다.
            return true;
        }
        else{
            return false;
        }
    },

    getStatusUI: function(request, response){
        var authStatusUI = '<a  href="/auth/login">login</a> | <a href="/auth/register">Register</a>';
        if (this.isOwner(request, response)){
            authStatusUI = `${request.user.nickname} | <a href="/auth/logout">logout</a>`;
        }
    
        return authStatusUI;
    }
}
