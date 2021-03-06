$(document).ready(function(){


    //For Worldwide Details
    init()

    function init(){
        var urlG = "https://api.covid19api.com/summary"
        var dataG = ''

        $.get(urlG, function(dataG){
            console.log(dataG.Global)

            dataG = `
                <td style="font-size: 18px;" class="text-warning">${dataG.Global.TotalConfirmed}</td>
                <td style="font-size: 18px;" class="text-info">${dataG.Global.NewConfirmed}</td>
                <td style="font-size: 18px;" class="text-success">${dataG.Global.TotalRecovered}</td>
                <td style="font-size: 18px;" class="text-danger">${dataG.Global.TotalDeaths}</td>
            `

            $("#globe").html(dataG)
        })
    }

    //For India Details
    var url = "https://api.covid19india.org/data.json"


    $.getJSON(url, function(data){
        console.log(data)

        var total_active, total_recovered, total_deaths, total_confirmed

        var state = []
        var confirmed = []
        var recovered = []
        var deaths = []

        $.each(data.statewise, function(id,obj){
            state.push(obj.state)
            confirmed.push(obj.confirmed)
            recovered.push(obj.recovered)
            deaths.push(obj.deaths)
        })

        // console.log(state)

        //Remove the 0th Element 'Total Cases' using shift()
        state.shift()
        confirmed.shift()
        recovered.shift()
        deaths.shift()

        console.log(state)

        total_active = data.statewise[0].active
        total_confirmed = data.statewise[0].confirmed
        total_recovered = data.statewise[0].recovered
        total_deaths = data.statewise[0].deaths

        $("#active").append(total_active)
        $("#confirmed").append(total_confirmed)
        $("#recovered").append(total_recovered)
        $("#deaths").append(total_deaths)


        var myChart = document.getElementById("myChart").getContext('2d')

        var ctx = document.getElementById("myChart");
        ctx.height = 180;

        var chart = new Chart(myChart,{
            type:'line',
            data:{
                labels:state,
                datasets:[
                    {
                        label: "Confirmed Cases",
                        data: confirmed,
                        backgroundColor: "#ffce56",
                        minBarLength: 100
                    },
                    {
                        label: "Recovered Cases",
                        data: recovered,
                        backgroundColor: "#00cc66",
                        minBarLength: 100
                    },
                    {
                        label: "Decreased",
                        data: deaths,
                        backgroundColor: "#ff6384",
                        minBarLength: 100
                    },
                ]
            },

        })
    })
})