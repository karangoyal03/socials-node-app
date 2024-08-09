import * as dao from "./dao.js";
export default function ShowRoutes(app) {
  const findAllShows = async (req, res) => {
    const shows = await dao.findAllShows();
    return res.json(shows);
  };
  const createShow = async (req, res) => {
    const show = await dao.createShow(req.body);
    return res.json(show);
  };

  const findShowByTitle = async (req, res) => {
    const { title } = req.params;
    const show = await dao.findShowByTitle(title);
    return res.json(show);
  };

  const updateShow = async (req, res) => {
    const { title } = req.params;
    const status = await dao.updateShow(title, req.body);
    return res.show(status);
  };

  const deleteShow = async (req, res) => {
    const { title } = req.params;
    const status = await dao.deleteShow(title, req.body);
    return status;
  };

  app.post("/api/shows", createShow);
  app.get("/api/shows", findAllShows);
  app.get("/api/shows/:title", findShowByTitle);
  app.put("/api/shows/:title", updateShow);
  app.delete("/api/shows/:title", deleteShow);
}
