import React, {useEffect} from "react";
import Navbar from "../../components/Navbar";
import { testApi } from "../../apis/Api";

const Homepage = () => {

    // Print Hello!, when page load (Automatic)
    useEffect(() => {
        console.log("Hello!!!")

        // trigger testAPI
        testApi().then((res) => {
            console.log(res) // Test api is working!
        })

    })


    return (
        <div>
            Homepage!!!!!!!!
        </div>
    )
}

export default Homepage;