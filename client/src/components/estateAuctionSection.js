import React from 'react';
import PlaceBid from './PlaceBid';
import EndAuction from './endAuction';
import serverFunctions from '../serverFunctions/estate'
import { DetailsBtnCard } from "./Styles/estateDetailsStyle";
import {CheckData} from './checkData';
import Loading from './loading';
function EstateAuctionSection(props){
    const [auction, setAuction] = React.useState([]);
    React.useEffect(() => {
      const fetchData = async () => {
        const auction = await serverFunctions.auctionOperations(props.data._id);
        setAuction(auction);
      }
      fetchData();
    }, [props.data._id]);


    const validation = CheckData(auction);

    if(validation || auction.length===0 || auction.auctionResult === "Auction ended"){
      return(
        <DetailsBtnCard>
            <Loading mood={validation ||"NoData"} msg={auction.auctionResult}/>
        </DetailsBtnCard>
      )
    }

  return(
        <>
        {auction.auctionResult?
        <EndAuction data={auction.auctionResult} estateId={props.data._id}/>
        :<PlaceBid data={auction} estateId={props.data._id}/>
    }
    </>
  );
}

export default EstateAuctionSection
