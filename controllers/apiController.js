function index(req, res) {
  res.json({
    message: "Welcome to my toilet finder. Please do not make a mess..",
    documentation_url: "",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/toilets", description: "Shows all available toilet db as json"},
      {method: "GET", path: "/api/toilets/:id", description: "Shows specific toilet with id"},
      {method: "POST", path: "/api/toilets", description: "Allows posting new toilets"},
      {method: "DELETE", path: "/api/toilets/:id", description: "Allows deleting data"},
      {method: "PUT", path: "/api/toilets/:id", description: "Allows updating database"}
    ]
  });
}

module.exports.index = index;
