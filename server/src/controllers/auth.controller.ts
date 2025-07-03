export const authenticate = async (req, res) => {
   try {
      res.status(200).json({ success: true, message: `Autenticación exitosa ${process.env.PORT}` });
   } catch (e) {
      res.status(500).json({ success: false, message: "server error" });
   }
};
