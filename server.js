const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
let latestYesAnswers = {};
app.post('/webhook', (req, res) => {
const formData = req.body.data;
const yesAnswers = {};
1.
2.
3.
4.
1.
2.
3.
2
for (const question in formData) {
if (formData[question][0].toLowerCase() === 'yes') {
yesAnswers[question] = formData[question][0];
}
}
latestYesAnswers = yesAnswers;
console.log('Received Yes answers:', latestYesAnswers);
res.sendStatus(200);
});
app.get('/latest', (req, res) => {
let html = '<h1>Latest Yes Answers</h1><ul>';
for (const question in latestYesAnswers) {
html += `<li><strong>${question}:</strong> ${latestYesAnswers[question]}</
li>`;
}
html += '</ul>';
res.send(html);
});
const listener = app.listen(process.env.PORT || 3000, () => {
console.log('Server running on port ' + listener.address().port);
});
