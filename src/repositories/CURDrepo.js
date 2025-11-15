class curdrepositories{
    constructor(model){
        this.model=model;
    }

    async createData(data){
        try {
            const responce = await this.model.create(data);
            return responce;
        } catch (error) {
            console.error("Error to create data");
            throw error;
        }
    }
    async FindDataOne(filter){
        try {
            const responce=await this.model.findById(filter);
            return responce;
        } catch (error) {
            console.log("Error to find data",error);
            throw error;
        }
    }
       async FindDataMany(filter){
        try {
            const responce=await this.model.find(filter,{_id:0,firstname:1,lastname:1,email:1,});
            return responce;
        } catch (error) {
            console.log("Error to find data",error);
            throw error;
        }
    }

    async updateData(filterId,updateData){
        try {
            const responce= await this.model.findByIdAndUpdate(filterId,updateData, { new: true, runValidators: true });
            return responce;
        } catch (error) {
            console.error("User not found / Error to update data");
            throw error;
        }
    }

    async deleteData(filter){
        try {
            const responce= await this.model.deleteOne(filter)
            return responce;
        } catch (error) {
            console.error("Error to delete data");
            throw error;
        }
    }
}

module.exports=curdrepositories;