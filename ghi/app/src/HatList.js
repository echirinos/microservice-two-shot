/* Stateful function components require importing useState and useEffect.
   Often times you will also want to import useRef, though I didn't use it here. */

   import React, { useState, useEffect, useRef } from "react";

   function HatsList(props) {
   
     // useState creates a state variable and a dedicated function to change it.
     //
     // The format to use useState is:
     // const [variable_name, changing_function] = useState(initial_value)
   
     const [locations, setLocations] = useState([])
     /* This created a state variable called locations that currently equals []
        and the function setLocations() that you can use to change the value of locations. */
   
     const [hats, setHats] = useState([])
     /* Same thing for hats */
   
     const [columns, setColumns] = useState([[], [], []])
     /* Same thing for columns */
   
     const [editMode, setEditMode] = useState({})
     /* We're going to use this editMode state to keep track of whether to display the
        hat information or the hat editing form inside the hat cards. */
   
   
     // When you want to change the value of a state variable, invoke it's
     // changing function and simply use the desired new value as the argument.
     //
     // For example:
     // setHats([1, 2, 3])
     //    hats is now equal to [1,2,3]
     // setHats("Konpeii")
     //    hats is now equal to "Konpeii"
     // setHats([])
     //    hats is now back to being an empty array
   
   
     // useEffect will execute a function whenever a trigger condition is met.
     //
     // The format to use useEffect is:
     // useEffect(function, trigger_condition)
     //
     // Or if you just want to define the function immediately, use an arrow function:
     // useEffect(() => {code_you_want_to_execute}, trigger_condition)
     //
     // The trigger_condition can be one of three things:
     //
     // - []:
     //      The function will execute one time when the component loads. This is
     //      effectively the same thing as using componentDidMount() in class components.
     //
     // - [variable/s]:
     //      The function will execute any time the listed variables change.
     //
     // - nothing:
     //      The function will execute any time any stateful variable changes.
     //
     // For example:
     useEffect(() => { console.log("The component loaded!") }, [])
     // This will print "The component loaded!" one time as this page loads.
     // Technically it triggers twice, but that's just a side effect of being in React.StrictMode
     useEffect(() => { console.log("The hats variable changed!") }, [hats])
     // This will print "The hats variable changed!" any time the hats variable changes.
     useEffect(() => { console.log("Something in the state changed!") })
     // This will print "Something in the state changed!" any time any stateful variable is changed.
   
   
     useEffect(() => {
       (async () => {
         const hatsResponse = await fetch('http://localhost:8090/api/hats/')
         if (hatsResponse.ok) {
           const hatsData = await hatsResponse.json()
           setHats(hatsData.hats)
         }
         const locationsResponse = await fetch('http://localhost:8100/api/locations/')
         if (locationsResponse.ok) {
           const locationsData = await locationsResponse.json()
           setLocations(locationsData.locations)
         }
       })()
     }, [])
     /* This code requests the hats and location list data from their APIs and stores them in the
        hats and locations variables respectively. The code runs one time as this page loads,
        just like componentDidMount(). */
   
     useEffect(() => {
       const columns = [[], [], []]
       let i = 0
       for (const hat of hats) {
         columns[i].push(hat)
         i = i + 1
         if (i > 2) {
           i = 0
         }
       }
       setColumns(columns)
     }, [hats])
     /* This code sorts the list of hats into three "columns" and stores the array of columns
        in the columns variable. The code runs every time the hats variable is changed
        (such as after creating, updating, or deleting a hat). */
   
     function createHatCards(column, col_idx) {
       return (
         <div key={col_idx} className="col">
           {column.map(hat => {
             return (
               <div key={hat.id} className="card mb-3 shadow">
                 <img src={hat.picture_url} className="card-img-top" style={(editMode[hat.id] ? { opacity: 0.2 } : {})} />
                 <div className={"card-body" + (editMode[hat.id] ? " d-none" : "")}>
                   <h5 className="card-title">{hat.style_name}</h5>
                   <h6 className="card-subtitle mb-2 text-muted">
                     {hat.fabric}, {hat.color}
                   </h6>
                 </div>
                 <div className={"card-body" + (editMode[hat.id] ? "" : " d-none")}>
                   <form id={"hat_" + hat.id} onSubmit={handleSubmit}>
                     <input type="hidden" name="id" value={hat.id} />
                     <div className="form-floating mb-1">
                       <input type="text" className="form-control" name="picture_url" defaultValue={hat.picture_url} placeholder="Picture URL" />
                       <label htmlFor="picture_url">Picture URL</label>
                     </div>
                     <div className="form-floating mb-1">
                       <input required type="text" className="form-control" name="style_name" defaultValue={hat.style_name} placeholder="Style Name" />
                       <label htmlFor="style_name">Style Name</label>
                     </div>
                     <div className="form-floating mb-1">
                       <input required type="text" className="form-control" name="fabric" defaultValue={hat.fabric} placeholder="Fabric" />
                       <label htmlFor="Fabric">Fabric</label>
                     </div>
                     <div className="form-floating mb-1">
                       <input required type="text" className="form-control" name="color" defaultValue={hat.color} placeholder="Color" />
                       <label htmlFor="color">Color</label>
                     </div>
                     <div className="mb-1">
                       <select required className="form-select" name="location">
                         <option value="">Choose a location</option>
                         {locations.map(location => {
                           return <option key={location.id} value={location.id}>{location.closet_name}</option>
                         })}
                       </select>
                     </div>
                   </form>
                 </div>
                 <div className={"card-footer" + (editMode[hat.id] ? " d-none" : "")}>
                   <span>{hat.location.closet_name} - {hat.location.section_number}/{hat.location.shelf_number}</span>
                   <span style={{ float: 'right' }}>
                     <button className="btn btn-primary" onClick={() => showEditForm(hat.id)}>Edit</button>
                     <span> </span>
                     <button className="btn btn-danger" onClick={() => deleteHat(hat)}>Delete</button>
                   </span>
                 </div>
                 <div className={"card-footer" + (editMode[hat.id] ? "" : " d-none")}>
                   <span style={{ float: 'right' }}>
                     <button className="btn btn-primary" form={"hat_" + hat.id}>Save</button>
                     <span> </span>
                     <button className="btn btn-warning" onClick={() => hideEditForm(hat.id)}>Cancel</button>
                   </span>
                 </div>
               </div>
             );
           })}
         </div>
       );
     }
     /* This is a custom function that takes one column of hats and creates the cards for them.
        Each card contains two card bodies, one that displays the hat info and one that displays
        a hat editing form. Only one of the bodies is displayed at a time, the editing form's class
        is set to "d-none" by default. The editMode[hat.id] stateful key can be set to true by
        clicking on the Edit button. If editMode is found to be true, "d-none" is applied to the
        info body and unapplied from the edting form. Upon saving the edits, editMode[hat.id] is
        set to false and so the classes are reversed again to redisplay the info body. */
   
     async function deleteHat(hat) {
       const response = await fetch(`http://localhost:8090/api/hats/${hat.id}/`, { method: "delete" })
       if (response.ok) {
         const idx = hats.indexOf(hat)
         const updated_hats = [...hats]
         updated_hats.splice(idx, 1)
         setHats(updated_hats)
       }
     }
     /* This is a custom function that deletes a hat from the server database, and then deletes the
        corresponding hat object from the hats state variable so that the component will re-render. */
   
     function showEditForm(id) {
       setEditMode({ ...editMode, [id]: true })
     }
     /* This is a custom function who's sole purpose is to set editMode[hat.id] to true when the
        user clicks on the edit button. Doing so causes the card to display the editing form. */
   
     function hideEditForm(id) {
       setEditMode({ ...editMode, [id]: false })
     }
     /* This does the exact opposite and is for the cancel button on the form. */
   
     async function handleSubmit(event) {
       event.preventDefault();
       const hat_id = event.target.id.value
       const location_id = event.target.location.value
       const data = {
         picture_url: event.target.picture_url.value,
         style_name: event.target.style_name.value,
         fabric: event.target.fabric.value,
         color: event.target.color.value,
         location: location_id,
       }
       const url = `http://localhost:8090/api/hats/${hat_id}/`
       const fetchConfig = {
         method: 'PUT',
         body: JSON.stringify(data),
         headers: {
           'Content-Type': 'application/json',
         }
       }
       const response = await fetch(url, fetchConfig)
       if (response.ok) {
         data.location = locations.find(location => location.id === parseInt(location_id))
         const idx = hats.findIndex(hat => hat.id === parseInt(hat_id))
         console.log(idx)
         const updated_hats = [...hats]
         updated_hats[idx] = { ...updated_hats[idx], ...data }
         setHats(updated_hats)
         console.log(hats)
         setEditMode({ ...editMode, [hat_id]: false })
       }
     }
     /* This is an event listener that triggers when the user saves their edits. It creates a
        data object using the form values and sends it via PUT request to the hats API to update
        the hat in the database. It then also applies the updated values to the corresponding hat
        object in the hats state variable so that the component will re-render. */
   
     return (
       <div className="row mt-5">
         {columns.map((column, col_idx) => {
           return (
             createHatCards(column, col_idx)
           );
         })}
       </div>
     )
   }
   
   export default HatsList