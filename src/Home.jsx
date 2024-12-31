import React ,{useState}from "react";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { List, ListItem, ListItemText, TextField } from "@mui/material";
import { useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/joy/Card';
function Home(){
    const [open, setOpen] = useState(false);
    const[submittedData,setsubmittedData]=useState();
    const[name,setName]=useState("")
    const[avatar,setAvatar]=useState("")
    const[phone,setPhone]=useState("")
    const[address,setAddress]=useState("")
    const [isEditing, setIsEditing] = useState(false);
    const[search,setSearch]=useState("")
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const[projects,setProjects]=useState([])
    const[phoneError,setPhoneError]=useState("")
  const[nameError,setNameError]=useState("")

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
  
  if (!validatePhoneNumber(value)) {
    setPhoneError("Enter numeric value");
  } else {
    setPhoneError("");
  }}

  const validateName=(name)=>{
    const nameRegex=/^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name)
  }

  const handleNameChange=(e)=>{
    const value=e.target.value;
    setName(value);
  

  if(!validateName(value)){
setNameError("Not Valid")
  }
  else{
    setNameError("")
  }}

  const handleSubmit=(e)=>{
      e.preventDefault();
      
      const newProject = { name, phone, address, avatar };
      setProjects((prevProjects) => {
        const updatedProjects = [...prevProjects, newProject];
        localStorage.setItem('projects', JSON.stringify(updatedProjects)); 
        return updatedProjects;
      });
     setOpen(false)
  }

    useEffect(() => {
      const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
      setProjects(storedProjects);
         
       }, []);
    
       const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
      );
      
    
  const Edit = (index) => {
    const projectToEdit = projects[index];
    setName(projectToEdit.name || "");
    setPhone(projectToEdit.phone || "");
    setAddress(projectToEdit.address || "");
    setIsEditing(true);
    setCurrentProjectIndex(index);
    
    setOpen(true)
  };

  const handleProject = () => {
    console.log(" button clicked"); 
    const newProject = { name, phone, address };
    
    setProjects((prevProjects) => [...prevProjects, newProject]); 
    setName(""); 
    setPhone("");
    setAddress("");
    setOpen(true); 
    console.log("modal")
  };
  

  const handleOpenForm = () => {
    setName("");
    setPhone("");
    setAddress("");
    setOpen(true);
  };

  const Delete = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

    return(
        <>
        
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
      <Button
       
        variant="outlined"
        color="white"
        startDecorator={<Add />}
        onClick={handleProject}
      
      >
        New project
      </Button>
      <input
          type="text"
          placeholder="Search by name"
          value={search}
           onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px" }}
        />
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new contact</DialogTitle>
         
          <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
            
              <label>Name:</label>
                <input
                label="Name"
                type="text"
                value={name}
                onChange={handleNameChange}
                />
                {nameError && <p style={{ color: "red" }}>{nameError}</p>}
                 <label>Avatar:</label>
                <input
                label="Avatar"
                type="text"
                value={avatar}
                onChange={(e)=>setAvatar(e.target.value)}
                />
                 <label>Phone:</label>
                <input
                label="Phone NUmber"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                />
                {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
                 <label>Address:</label>
                <input
                label="Address"
                type="text"
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                />
              {/* <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required />
              </FormControl> */}
              {/* <FormControl>
                <FormLabel>Avatar</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Phone NUmber</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>address</FormLabel>
                <Input required />
              </FormControl> */}
              <FormControl>
                <FormLabel>label</FormLabel>
                <select>
               <option value="Work">Work</option>
            <option value="School">School</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
              </select>
                
              </FormControl>
              <Button onClick={handleSubmit}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
        
      </Modal>

      <List>
  {filteredProjects.map((project, index) => (
    <ListItem key={index}>
      <ListItemText
      
        secondary={`Name:${project.name},Phone: ${project.phone}, Address: ${project.address}`}
      />
       <button onClick={() => Edit(index)}>Edit</button>
       <button onClick={()=>Delete(index)}> Delete</button>

      
      
    </ListItem>
  ))}
 
  </List>
  
        </>
    )
}

export default Home;