import React , { useEffect , useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.component';
import Connect from '../../components/Connect/Connect.component';
import Footer from '../../components/Footer/Footer.component';
import { Main } from './SoftwarePage.styles';
import Repo from '../../components/Repo/Repo.component';
import Techno from '../../components/Techno/Techno.component';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateProjects } from '../../redux/project/project.action';
import  WithSpinner  from '../../components/with-spinner/with-spinner.component';
import { firebase } from '../../firebase/firebase';


const RepowWithSpinner = WithSpinner(Repo);


const SoftwarePage = ({updateProjects}) => {

  const [loading , setLoading ] = useState(true);
  //const [projects , setProjects ] = useState(null);

  //const [projects , setProjects] = useState([]);
  let config = {
  headers: {
    Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2NlYzRmNWVhNjFhNGU5YTJhMjBlM2ZjN2YyZTFiNjU5MjgyMzNkNjA1NmI2NDUwZmY5YjA5ZWVkOGYwY2JmNjgyNGU4MzA1Y2YwYjYzMzciLCJpYXQiOjE2MzQ1ODYxMDguNDIyMzU1LCJuYmYiOjE2MzQ1ODYxMDguNDIyMzU4LCJleHAiOjE2NjYxMjIxMDguMjQ1NDI5LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.d6uYG95jvSi65m9JL0dMtEIjq4eagCMcGYHlFqadamPNZRyai55ECmStnNg0em5xSVn-_rzkgRaN_At8TvwdW89qM8B7ERBY0rEytBhE3j-E4aHNqWT2qaEwvBN0_Kf56dOwIZ30OkTSKpH2gKA_YJKuiNY_GQ4ruD5b8U5hZklXk985x65nZ_7010ATpVDQFC-i6gT_PFJlG14h5C_jXPo7BRBVMiHAqS9jtF-Gy9H9LhaGA_SVaLtMcis4gr5U35rLIYqMVAynQ0_IsKsqt60SrvTUCp5pIyxEwR5H7IDLoy-HzhuC5k4_kt9aEQ2l5tUnwADKdq9K1WPK2CDr7cdleZe0YtYqK-WbHK-XO9yv5vjcOHKwde0X6q-amAguMXDDh5i2ff-roHHWMlTn2sOyL_x59M3E2Xs0trCH2KmFmn-k35hzqogHw4JNjNhMxY06T6x40nZ0ktxDNhssmcclq29y3SDRjnu9Ww69UG1wIAlWI1MZm7WFYwepsAb7E-85Va-0BaNgkkiEcjubRtk6yh7FbxKBwv4QYZzBe6sTEPTC4BWt3VbnjygvPI5KE0P8hFKqMUWSaVUls9FoTnrcxtARipPpGkNDDqJQJVIaUS27Gy4CRQsq3UEm-2yHJ71zeotDvyZstc6n7KHVf5hFSaw1GUGF-ngDr35xXck",
    Accept : "Application/json"
  }
}

// useEffect(()=>{
//   axios.get('/api/projects',config).then(res => {
//     updateProjects(res.data.data);
//     //setProjects(res.data.data);
//     setLoading(false);
//     //add projects into firebase
//     // res.data.data.map((project) =>(
//     //       firebase.firestore().collection('projects').add({
//     //           project : project
//     //       })
//     //
//     //   ));
//
//
//   })
//                           .catch(err => console.log(err));
// },[]);



let projects = [];
useEffect(()=>{
  let q = firebase.firestore().collection('projects').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
      let currentProject = doc.data().project;
    projects.push( currentProject );
    });
    updateProjects(projects);
    setLoading(false);

  });


//  Add our project into the firestore
// projects.map((project) =>(
//       firebase.firestore().collection('projects').add({
//           project : project
//       })
//
//   ));
},[]);






  return (
    <Main>
      <Navbar background="white" color="black"/>
      <RepowWithSpinner isLoading={loading} />
      <Techno />
      <Connect />
      <Footer />
    </Main>
  )
}

const mapDispatchToProps = dispatch => ({
  updateProjects : projects => dispatch(updateProjects(projects))
});


export default  connect(null , mapDispatchToProps)(SoftwarePage);
