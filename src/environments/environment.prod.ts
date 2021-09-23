export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyB_hifCjvJb7jf3hnZozfzlnJQ6N0iYuXI",
    authDomain: "ionic5-firebase-authentication.firebaseapp.com",
    databaseURL: "https://ionic5-firebase-authentication.firebaseio.com",
    projectId: "ionic5-firebase-authentication",
  },

  socialShareOption: [
    {
      title: 'Facebook',
      logo: 'assets/icon/FaceLogo.png',
      href: 'https://facebook.com/sharer/sharer.php?u=http://farm8.staticflickr.com/7027/6851755809_df5b2051c9_z.jpg'
    },
    {
      title: 'Email',
      logo: 'assets/icon/GmailLogo.png',
      href: 'mailto:receipient@user.com?subject=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&body=This is an email body shared directly from an Ionic app using URL or links. This can be used in any web app.'
    }
  ]
};
