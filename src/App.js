import './App.css';
import contacts from "./contacts.json";
import { useState } from 'react';

const firstContacts = contacts.slice(0,6);

function App() {

  const [currentContacts, setCurrentContacts] = useState(firstContacts)

  const cardStyles = {
    backgroundColor: "#ff9a3c",
    margin: "10px",
    padding: "10px",
    borderRadius: "20px",
    width: "300px",
  }
  const cardContainer = {
    display: "flex",
    flexWrap: "wrap"
  }

  const addContact = ()=>{
    
    if (currentContacts.length === contacts.length) {
      return;
    }
  
    const randomNumber = Math.floor(Math.random() * contacts.length);
    const randomContact = contacts[randomNumber];
    console.log(randomContact);
    // para evitar que se duplique la creacion de un contact
  
    let newContacId = randomContact.id
    let existsContact = false
    currentContacts.forEach((eachContact)=>{
        if (newContacId === eachContact.id) {
          existsContact = true
        }
    })
    console.log(existsContact);
    if (existsContact === true) {
        console.log("se ha hecho una recusrion");
        addContact()
        return
    }

    //agregar un contact
    const currentContactsClone = [...currentContacts];
    currentContactsClone.push(randomContact);
    setCurrentContacts(currentContactsClone)

  }

  const sortByName = ()=>{
    const currentContactsClone = [...currentContacts];
    currentContactsClone.sort((elem2, elem1)=>{
      if (elem2.name[0] > elem1.name[0]) {
        return 1
      } else if (elem2.name[0] < elem1.name[0]) {
        return -1
      } else {
        return 0
      }
    })
    setCurrentContacts(currentContactsClone)
  }

  const sortByPopularity = ()=>{
    const currentContactsClone = [...currentContacts];
    currentContactsClone.sort((elem2, elem1)=>{
      if (elem2.popularity < elem1.popularity) {
        return 1
      } else if (elem2.popularity > elem1.popularity) {
        return -1
      } else {
        return 0
      }
    })
    setCurrentContacts(currentContactsClone)
  }



  return (
    
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addContact}>Add Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <div style={cardContainer}>
        {currentContacts.map((eachContact)=>{
          return(
            <div style={cardStyles} key={eachContact.id}>
              <img id="pictures" src={eachContact.pictureUrl} alt="picture" height={"200px"}/>
              <h3>{eachContact.name}</h3>
              <h3>Popularity: {eachContact.popularity}</h3>
              <h3>{(eachContact.wonEmmy === true) && <span>Won the emy</span>}</h3>
              <h3>{(eachContact.wonOscar === true) && <span>Won the Oscar</span>}</h3>
            </div>
          )
        })  }
      </div>


    </div>
  );
}

export default App;
