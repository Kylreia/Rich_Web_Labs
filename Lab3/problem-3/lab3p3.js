document.addEventListener("DOMContentLoaded", function() {
    const {Subject} = rxjs;

    class myNotes {
      constructor(id, content, parent = null) {
        this.id = id;
        this.content = content;
        this.parent = parent;

        this.children = [];
        
        this.newParent = new Subject();
      } // end constructor

      newChild(childNote) {
        this.children.push(childNote);
      } // end newChild 

      setParent(parentNote) {
        this.newParent.next(parentNote);
      } // end setParent

      deleteNote(childID) {
        const childIndex = this.children.findIndex(child => child.id === childID);
        if (childIndex !== -1) {
          this.children[childIndex].newParent.unsubscribe();
          this.children.splice(childIndex, 1);
        } // end if
      } // end deleteNote

    } // end class myNotes

    const notes_arr = [];

    window.createNote = function() {
      const userInput = document.getElementById('myInput');
      const selectParent = document.getElementById('parentNote');
      const content = userInput.value;
      const parentID = selectParent.value;

      if (content) {
        let parentNote;

        if (parentID) {
          parentNote = notes_arr.find(note => note.id === parseInt(parentID));
        } // end inner if

        const newNote = new myNotes(Date.now(), content);

        if (parentNote) {
          parentNote.newChild(newNote);
        } // end inner if

        else {
          notes_arr.push(newNote);
        } // end inner else

        userInput.value = '';

        selectParent.innerHTML = '<option value="">None</option>';
        setOption();

      } // end if
    }; // end function createNote
    
    function setOption() {
        const selectParent = document.getElementById('parentNote');
  
        notes_arr.forEach(note => {
          const option = document.createElement('option');
          option.value = note.id;
          option.textContent = note.content;
          selectParent.appendChild(option);
        }); // end forEach

        showParent();
    } // end function setOption

    function showParent() {
        const noteList = document.getElementById('noteList');
        noteList.innerHTML = '';
  
        notes_arr.forEach(note => {
          const listEl = document.createElement('li');
          listEl.textContent = note.content;

          // CSS for List
          listEl.style.color = 'white';
          listEl.style.fontSize = '22px';
          listEl.style.marginBottom = '2px';
  
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';

          // CSS for delete button
          deleteBtn.style.margin = '8px';
          deleteBtn.style.padding = '5px';
          deleteBtn.style.border = 'none';
          deleteBtn.style.borderRadius = '4px';
          deleteBtn.style.fontSize = '18px';
          deleteBtn.style.backgroundColor = 'white';
          deleteBtn.style.color = '#c29351';

          deleteBtn.onclick = function() {
            deleteNote(note.id);
          }; // end onclick function

          listEl.appendChild(deleteBtn);

          if (note.children.length > 0) {
            const childEl = document.createElement('ul');
            showChild(note.children, childEl);
            listEl.appendChild(childEl);
          } // end if
  
          noteList.appendChild(listEl);
        }); // end forEach
      } // end function showParent

    function showChild(children, parentElement) {
        children.forEach(child => {
        const listEl = document.createElement('li');
        listEl.textContent = child.content;

        if (child.children.length > 0) {
            const childEl = document.createElement('ul');
            showChild(child.children, childEl);
            listEl.appendChild(childEl);
        } // end if

        parentElement.appendChild(listEl);
        }); // end forEach
    } // end function showChild

    function deleteNote(noteID) {
        const removeNote = notes_arr.find(note => note.id === noteID);

        if (removeNote) {
            const i = notes_arr.indexOf(removeNote);
            if (i !== -1) {
                notes_arr[i].newParent.unsubscribe();
                notes_arr.splice(i, 1);
                const selectParent = document.getElementById('parentNote');
                selectParent.innerHTML = '<option value="">None</option>';
                setOption();
            } // end inner if
        } // end if
    } // end function deleteNote
});