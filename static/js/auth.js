function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $.post(
        "/auth/login",
        {
        'Name': profile.getName(),
        'Image': profile.getImageUrl(),
        'Email': profile.getEmail()
        },
        (data, status) => {
        if(data['success'] == true){
            window.location.href = '/';
        }
        else{
            $("div.error").text("Some error occured!!!");
        }
        }
    );
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        window.location.href = '/auth/logout';
    });
}