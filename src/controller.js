import { pool } from './database.js'

class LibroController{
    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros')
        res.json(result)
    }

    async getOne(req,res){
        try{
            const isbn = req.params.isbn;
            const [result] = await pool.query(`SELECT * FROM Libros WHERE isbn=(?)`, [isbn]);
            if(result.length > 0){
                res.json(result);    
        }else{
            res.status(404).json({"Error": "No se encontro el libro"})}
      } catch(error){
        res.status(500).json({"Error": "Ocurrio un error al obtener el libro"})
      } 
}
    

    async add(req,res){
        try{
            const libro = req.body;
        const [result] = await pool.query(`Insert INTO Libros(nombre, genero, precio, stock) VALUES (?, ?, ?,?)`, [libro.nombre, libro.genero, libro.precio, libro.stock])
        res.json({"Id insertado": result.insertId})
        }catch(error){console.log("Se ha introducido un dato invalido")}
        

}
    

    async delete(req, res){
        try {
            const libro = req.body;
            const [result] = await pool.query(`DELETE FROM Libros WHERE isbn=(?)`, [libro.isbn]);
                if(result.affectedRows <= 0) return res.status(404).json({message: "Libro no encontrado"});
                res.json({"Registro eliminado": result.affectedRows});
        } catch (error) {
            return res.status(500).json({ message: 'No se puede eliminar el libro'})       
}
}
    
    
    
    async update(req,res){
        try{
          const libro = req.body
        const [result] = await pool.query(`UPDATE Libros SET nombre=(?), genero=(?), precio=(?), stock=(?)`, [libro.nombre, libro.genero, libro.precio, libro.stock])
        if(result.changedRows <= 0) return res.status(404).json({message: "No se encontro el libro o no hubieron actualizaciones"}) ;     
        res.json({"Registros actualizados": result.changedRows})  
        }catch(error){
            console.log('Se ha introducido un dato invalido')}

    
    }

}






export const libro = new LibroController