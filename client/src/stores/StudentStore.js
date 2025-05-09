import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')

export const useStudentStore = defineStore('students', () => {


    const sortedStudents = ref([])
    const mostRecentStudent = ref( {} )

    const addNewStudentErrors = ref( [])

    function getAllStudents() {
        studentAPI.get().then( students => {
            sortedStudents.value = students
        })
    }

    function addNewStudent(student) {
        studentAPI.post(student).then( () => {
            getAllStudents()
        })
    }

    function deleteStudent(studentToDelete) {
        sortedStudents.value = sortedStudents.value.filter( (student) => {
            return studentToDelete !== student
        })
    }

    function arrivedOrLeft(student) {
       const editStudentAPI = mande(`/api/students/${student.id}`)
       editStudentAPI.patch(student).then( () => {
       getAllStudents()
       })
    }



    const studentCount = computed( () => {
        return sortedStudents.value.length
    })

    return { 
        // reactive data
        sortedStudents,
        mostRecentStudent, 

        // functions
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft,
        getAllStudents,

        // computed properties

        studentCount
    }

})