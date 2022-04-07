const { response } = require('express')
const express = require('express')
const app = express()

let persons = 
[
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  },

  {
    "id": 5,
    "name": "Mahi Tsegaye",
    "number": "301-328-6206"
  }
]

// #1 returns a hardcoded list of phonebook entries
app.get('/api/persons', (request, response) =>{
  response.json(persons)
})
//# 2 show the time that the request was received and how many entries are in the phonebook at the time of processing the request.
app.get('/api/info', (request, response) => {
  let arryCount = persons.length;
  const moment = new Date();

  response.send (`phonebook has info for ${arryCount} people </br> 
  <br>${moment}`);
})


// #3 displaying the information for a single phonebook entry
app.get('/api/persons/:id', (request, response) => {  
  const id = Number(request.params.id)
  const person = persons.find(person =>{
  console.log(person.id, typeof person.id, id, typeof id, person.id === id)  
  return person.id === id })
  if (person) {    
     response.json(person) } 
     else {      
      response.status(404).end()
     } 
    })
// # 4  delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
// #5 
const generateId = () =>{
  const maxID = persons.length > 0
  ? Math.floor(Math.random(...persons.map((n) => n.id)) * 10000)
  : 0
  return maxID +1
}
app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)
let person = 

{
  id: generateId(),
  name: body.name,
  number: body.number  
  }

  persons = persons.concat(person)

  response.json(person)
})
//6
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  let person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})