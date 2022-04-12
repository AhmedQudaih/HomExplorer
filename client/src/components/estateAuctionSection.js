import React from 'react';
import PlaceBid from './PlaceBid';
import EndAuction from './endAuction';
function EstateAuctionSection(props){

    var nowDate = new Date();
    var auctionDate = new Date(props.data.auctionData.startDate);
    auctionDate.setDate(auctionDate.getDate() + props.data.auctionData.duration);
  return(
        <>
        {auctionDate.getDate() > nowDate.getDate()?
         <PlaceBid estateId={props.data._id}/>
        :<EndAuction estateId={props.data._id}/>
    }
    </>
  );
}

export default EstateAuctionSection
