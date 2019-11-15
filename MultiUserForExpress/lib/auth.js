module.exports = {
    isOwner:function(request, response){
        if(request.user){
            request.session.is_logined = true;
        }

        //console.log(request.session.is_logined);
        
        if(request.session.is_logined){
            return true;
        }
        else{
            return false;
        }
    },
    getStatusUI: function(request, response){
        var authStatusUI = '<a href="/auth/login">login</a> | <a href="/auth/register">register</a>';
        if(this.isOwner(request, response)){
            authStatusUI = `${request.user.nickname} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
}