import React from 'react'
import Grid from '@material-ui/core/Grid'
import Header from './Header'

const Main = ({ children }) => (
   <div>
     <Header/>
     <Grid container justify="center" alignItems="center">
      <Grid item xs={12} sm={12}  alignContent="center">
        {children}
      </Grid>
     </Grid>
   </div>
)

export default Main