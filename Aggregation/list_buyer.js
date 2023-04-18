let lookup = async () => {
  try {
    let lookup = {
      $lookup: {
        from: "brokers",
        let: { comp_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: { $eq: ["$companyId", "$$comp_id"] } } } },
          {
            $lookup: {
              from: "shops",
              let: { broker_id: "$_id" },
              pipeline: [
                {
                  $match: {
                    $expr: { $and: { $eq: ["$brokerId", "$$broker_id"] } },
                  },
                },
                {
                  $lookup: {
                    from: "buyers",
                    let: { shop_id: "$_id" },
                    pipeline: [
                      {
                        $match: {
                          $expr: { $and: { $eq: ["$shopId", "$$shop_id"] } },
                        },
                      },
                    ],
                    as: "buyerData",
                  },
                },
              ],
              as: "shopData",
            },
          },
        ],
        as: "brokerData",
      },
    };
    return lookup;
  } catch (err) {
    throw err;
  }
};

let limit = async(num)=>{
  try{
    let limit = {
      $limit: num
    };
    return limit;
  }catch(err){
    console.log('--limit--',err);
    throw err
  }
}

let sort = async()=>{
  try {
    let sort = {
      $sort: {company:1}
    }
    return sort;
  } catch (err) {
    console.log("sort err",err);
  }
}

let skip = async(num)=>{
  try{
    let skip ={
      $skip : num
    }
    return skip;
  }catch{
    console.log("--skip--",skip);
  }
}



module.exports = {
  lookup: lookup,
  limit : limit,
  sort : sort,
  skip : skip,

};


