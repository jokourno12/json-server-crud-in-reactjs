import React from "react";
import Axios from 'axios';

const LinkFakeAPI = "http://localhost:2000/data"

export default class FakeAPI extends React.Component{

    componentDidMount(){
        this.getFakeAPI()
    }

    getFakeAPI = () => {
        Axios.get(LinkFakeAPI)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <h1>Open your inspect and go to console tabs!</h1>
            </div>
        )
    }
}