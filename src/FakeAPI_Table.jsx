import React from "react";
import Axios from 'axios';

const LinkFakeAPI = "http://localhost:2000/data"

export default class FakeAPI_Table extends React.Component{

    state = {
        data: null
    }

    componentDidMount(){
        this.getFakeAPI()
    }

    getFakeAPI = () => {
        Axios.get(LinkFakeAPI)
        .then((res) => {
            console.log(res.data)
            this.setState({data: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(this.state.data === null){
            return(
                <div>
                    Loading ...
                </div>
            )
        }
        
        return(
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Penerbit</th>
                            <th scope="col">Tahun</th>
                        </tr>
                    </thead>

                    <tbody>

                    {
                        this.state.data.map((value, index) => {
                            return(
                                <tr key={index}>
                                    <th scope="row">{value.id}</th>
                                    <td>{value.title}</td>
                                    <td>{value.penerbit}</td>
                                    <td>{value.tahun}</td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            </div>
        )
    }
}