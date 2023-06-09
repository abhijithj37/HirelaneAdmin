import { Typography,Box,Divider,Grid,Container,Toolbar,Button } from '@mui/material'
import axios from '../utils/axios'
import { ApartmentRounded,Work as WorkIcon,LocalAtm as LocalAtmIcon,Timeline as TimelineIcon } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../app/features/adminSlice'
import { handleSendNotification } from '../utils/api'
import { useSocket } from '../Context/SocketProvider'



function PostDetails(){
  const socket=useSocket()
    const navigate=useNavigate()
    const {id}=useParams()
    const dispatch=useDispatch()
    const {post}=useSelector((state)=>state.admin)
    useEffect(()=>{
  axios.get(`post/${id}`,{withCredentials:true}).then(({data})=>{
      dispatch(setPost(data))
  }).catch((err)=>{
     console.log(err.message)
  })
    },[id,dispatch])

 const handleUpdateStatus=(status)=>{
    const data={
status,
postId:id
    }


    const notification = {
      from: "Hirelane",
      to: post?.employerId,
      content: `Your Job post  for ${post?.jobTitle} posted on ${new Date(post.createdAt).toLocaleDateString('en-us',{day:'numeric',month:"long",year:"numeric"})} was ${status}`,
      createdAt: new Date(),
    };


    axios.put('/verify-post',data,{withCredentials:true}).then(({data})=>{
        
          dispatch(setPost(data))
          handleSendNotification(notification,socket)
          window.alert(`post ${status}`)
          navigate('/posts')

    }).catch((err)=>{
    console.log(err.message)
    })
 }
  return (
    <>

      <Box
        component="main"
        sx={{
          backgroundColor:(theme)=>theme.palette.common.white,
          flexGrow:1,
          height:"100vh",
          overflow:"auto",
        }}
      >
        <Toolbar/>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography gutterBottom variant="h5" fontWeight={500}></Typography>
        <Divider></Divider>

          <Grid container sx={{ backgroundColor:"white" }} spacing={1}>
            <Grid item xs={12} lg={12}>
               

              <>
                <Grid
                  sx={{
                    minHeight: 725,
                    overflow: "none",
                    borderRadius: 2,
                    // border: 1,
                    borderColor: "lightgray",
                  }}
                >
                  <Box
                    sx={{
                      position: "",
                      top: 0,
                      backgroundColor: "white",
                      padding: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">
                      {post && post.jobTitle}
                      </Typography>
                      <Typography color={"purple"} variant="body2">
                      {post && post.companyName}
                      </Typography>
                      <Typography
                        marginTop={1}
                        color={"gray"}
                        variant="p"
                      ></Typography>
                      <Typography marginTop={1}>
                        {post && post.jobLocation}
                      </Typography>
                    </Box>
                    <Box> 
              {post?.status!=='Approved' && <Button
                    sx={{ marginTop: 1, height: 40 }}
                    variant="contained"
                    color='success'
                    size='small'
                    onClick={() =>
                    handleUpdateStatus('Approved')
                    }
                > 
                    Approve
                </Button>}

                {post?.status!=="Rejected" && <Button
                      sx={{ marginTop: 1, height: 40 ,marginLeft:1}}
                      variant="contained"
                      color='error'
                      size='small'
                      
                      onClick={() =>
                        handleUpdateStatus('Rejected')
                      }
                    > 
                      Reject
                    </Button>}
                    </Box>
                  </Box>

                  <Box sx={{ padding: 2 }}>
                    <Typography marginLeft={1} variant="h6">
                      Job Details
                    </Typography>
                    <Box padding={1}>
                      {" "}
                      <Typography
                        sx={{ opacity: 0.9 }}
                        fontSize={15}
                        variant="h6"
                      >
                        No of Openings:{" "}
                        {post && post.noOfOpenings}
                      </Typography>
                    </Box>
                    <Divider sx={{ margin: 0 }}></Divider>
                     <Box padding={1}>
                      <Box display={"flex"}>
                        <WorkIcon
                          fontSize="small"
                          sx={{ color: "gray", marginTop: 0.4 }}
                        />
                        <Typography fontSize={17} variant="h6">
                          Job Type
                        </Typography>
                      </Box>

                      <Box
                        textAlign={"center"}
                        bgcolor={"#e3f2fd"}
                        borderRadius={1}
                        fontFamily={"initial"}
                        width={120}
                        border={1}
                        borderColor={"lightgray"}
                      >
                        {post&&post.jobType}
                      </Box>
                    </Box>
                     <Box padding={1}>
                      <Box display={"flex"}>
                        <ApartmentRounded sx={{ color: "gray" }} />
                        <Typography fontSize={17} variant="h6">
                          Work Place Type
                        </Typography>
                      </Box>
                      <Box
                        textAlign={"center"}
                        bgcolor={"#e3f2fd"}
                        borderRadius={1}
                        fontFamily={"initial"}
                        width={120}
                        border={1}
                        borderColor={"lightgray"}
                      >
                        {post&&post.workPlaceType}
                      </Box>
                    </Box>
                    
                    <Divider sx={{margin:0}}></Divider>


                    <Box display={'flex'}> 
                    <Box padding={1}>
                      <Box display={"flex"}>
                        <LocalAtmIcon sx={{ color: "gray" }} />
                        <Typography fontSize={17} variant="h6">
                          Salary Range
                        </Typography>
                      </Box>
                      <Box
                        textAlign={"center"}
                        bgcolor={"#f5f5f5 "}
                        borderRadius={1}
                        fontFamily={"initial"}
                        width={120}
                        border={1}
                        borderColor={"lightgray"}
                      >
                        {post && post.salaryFrom+"₹-"+post.salaryTo+'₹'}
                      </Box>
                    </Box>
                    <Box padding={1}>
                      <Box display={"flex"}>
                        <TimelineIcon sx={{ color: "gray" }} />
                        <Typography fontSize={17} variant="h6">
                          Experience
                        </Typography>
                      </Box>
                      <Box
                        textAlign={"center"}
                        bgcolor={"#f5f5f5"}
                        borderRadius={1}
                        fontFamily={"initial"}
                        width={120}
                        border={1}
                        borderColor={"lightgray"}
                      >
                        {post && post.experience}
                      </Box>
                    </Box>
                    </Box> 

                    <Divider sx={{ margin: 0 }}></Divider>
                    <Box padding={1} sx={{ wordWrap: "break-word" }}>
                      <Typography variant="h6">
                        Full Job Description
                      </Typography>

                      <Typography sx={{opacity:0.8}} variant="subtitle2">
                        {post&&post.description}
                      </Typography>
                    </Box>
                    <Divider sx={{margin:0}}></Divider>

                    <Box padding={1}>
                      <Typography variant="h6">Hiring Insights </Typography>
                      <Typography fontSize={17} variant="h6">
                        Job Activity
                      </Typography>
                      <Typography variant="body2">
                        Posted on:{post&&post.createdAt}
                      </Typography>
                    </Box>
                    <Divider sx={{margin:0}}></Divider>
                     

                    {post?.screeningQuestions.length?(
                      <Box>
                        <Typography variant="h6">
                          Screening Questions{" "}
                        </Typography>
                        {post?.screeningQuestions.map((ques,index)=>{
                          return (
                            <Typography key={index}>
                              {index+1} {ques.question}
                            </Typography>
                          );
                        })}
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                </Grid>
              </>
            </Grid>
          </Grid>
        </Container>
      </Box>
   
  </>
  )
}

export default PostDetails
