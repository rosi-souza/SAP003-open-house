const profile = (props) => {
  const template = `
    <div class="all-content">
      <div class="content-one">
      <div class="name">
        <span class="name-user">${props.nome}</span>
      </div>
      </div>
        <div class="border"></div>
        <div class="content logout">
          <button class="options">Logout</button>
        </div>
        <div class="border"></div>
      </div>
    </div>
  `;
  return template;
};

const getUser = () => {
  const main = document.querySelector('main');
  const user = firebase.auth().currentUser.uid;
  document.querySelector('.container-category').innerHTML = '';
  document.querySelectorAll('.arrow').forEach((arrow) => arrow.classList.add('hide'));

  firebase.firestore().collection('users')
    .where('user_uid', '==', user)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        main.innerHTML = profile(doc.data());
      });
    })
    .then(() => {
      document.querySelector('.logout').addEventListener('click', () => {
        firebase.auth().signOut()
          .then(window.location.hash = '');
      });
    });
};

export default getUser;
