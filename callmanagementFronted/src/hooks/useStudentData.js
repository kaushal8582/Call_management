  // hooks/useStudentData.js
  import { useState, useEffect, useContext } from 'react';
  import { mycontext } from '../component/context/myContext';
  import toast from 'react-hot-toast';
  import {BASE_URL} from "../component/URL"

  const useStudentData = () => {
    const context = useContext(mycontext);

    const {index,setIndex,filterStudent} = context;

    const {setLoader} = context;
    const [students, setStudents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [interestLevel, setInterestLevel] = useState('Low');
    const [callStatus, setCallStatus] = useState('');
    const [reason, setReason] = useState('');
    const [response1, setResponse] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');
    const [id, setId] = useState('');
    const [progress, setProgress] = useState(0);
    const [fullfilledStudents, setFullfilledStudents] = useState([]); 

    useEffect(()=>{
      console.log(interestLevel,callStatus,reason,response1,followUpDate);
      
    },[interestLevel,callStatus,reason,response1,followUpDate])

    useEffect(() => {
      const fetchStudents = async () => {
        setLoader(true);
        const worker = JSON.parse(localStorage.getItem('worker'));
        const accessToken = worker?.accessToken;
        try {
          const response = await fetch(
            `${BASE_URL}/collegeBuddy/api/v1/student/find-my-student/${worker?.data?._id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              method: 'POST',
            }
          );
          const data = await response.json();
          if (response.ok) {
            const filteredStudents = data?.data.filter(
              (student) => student.callStatus !== 'fullfill'
            );
            const filteredFullfilledStudents = data?.data.filter(
              (student) => student.callStatus === 'fullfill'
            );

            setStudents(data.data);
            setFullfilledStudents(filteredFullfilledStudents);
            setFullfilledStudents((prev)=>prev.sort((a,b)=>new Date(a.followUpDate) - new Date(b.followUpDate)))
            updateProgress(filteredStudents);
          }
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoader(false);
        }
      };

      fetchStudents();
    }, [setLoader, BASE_URL]);

    useEffect(() => {
      if (filterStudent.length > 0 && filterStudent[index]) {
        const currentStudent = filterStudent[index];
        setInterestLevel(currentStudent.interests || 'Low');
        setCallStatus(currentStudent.callStatus || '');
        setResponse(currentStudent.response || '');
        setReason(currentStudent.reason || '');
        setFollowUpDate(new Date(currentStudent.followUpDate).toISOString().slice(0, 16) || '');
        setId(currentStudent._id || '');
      } else {
        // Reset or handle cases when there are no students or index is invalid
        setInterestLevel('Low');
        setCallStatus('');
        setResponse('');
        setReason('');
        setFollowUpDate('');
        setId('');
      }
    }, [students, index]);


    const updateProgress = (studentList) => {
      const total = studentList.length;
      const fullfillCount = studentList.filter(
        (student) => student.callStatus === 'fullfill'
      ).length;
      const percentage = (fullfillCount / total) * 100;
      setProgress(percentage);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(interestLevel,callStatus,response1,reason,followUpDate,currentIndex,index);
      
      const worker = JSON.parse(localStorage.getItem('worker'));
      const accessToken = worker?.accessToken;
      try {
        const response = await fetch(
          `${BASE_URL}/collegeBuddy/api/v1/student/update-student-response/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            method: 'POST',
            body: JSON.stringify({
              interests: interestLevel,
              callStatus: callStatus,
              response: response1,
              reason: reason,
              followUpDate: followUpDate,
            }),
          }
        );
        if (response.ok) {
          toast.success('Data updated successfully!');
          const updatedStudents = students.map((student, ind) =>
            ind === index ? { ...student, callStatus } : student
          );
          console.log( "update student ", updatedStudents);
          
          const updatedFullfilledStudents = updatedStudents.filter(
            (student) => student.callStatus === 'fullfill'
          );
          setFullfilledStudents(updatedFullfilledStudents);
          console.log(fullfilledStudents);
          
          setStudents(updatedStudents);
          updateProgress(updatedStudents);
        }
      } catch (error) {
        console.error('Error updating student data:', error);
        toast.error('Failed to update data');
      }
    };

    return {
      students,
      currentIndex,
      setCurrentIndex,
      interestLevel,
      setInterestLevel,
      callStatus,
      setCallStatus,
      reason,
      setReason,
      response1,
      setResponse,
      followUpDate,
      setFollowUpDate,
      progress,
      handleSubmit,
      fullfilledStudents,
    };
  };

  export default useStudentData;
