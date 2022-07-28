const submitForm = (url, body) => {
  fetch(url, {
    method: 'POST', mode: 'no-cors', header: {
      'Content-Type': 'application/json'
    },
    body,
  })
    .then(data => {
      console.log('data [ OK! ]', data);
    })
    .catch(err => console.error(err));
};

export default submitForm;
