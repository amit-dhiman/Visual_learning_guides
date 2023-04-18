db.demo546.aggregate({
  $redact: {
    $cond: {
      if: {
        $and: [
          {
            $lt: ["$Value1", "$Value2"],
          },
          { $ifNull: ["$Value3", false] },
        ],
      },
      then: "$$KEEP",
      else: "$$PRUNE",
    },
  },
});



