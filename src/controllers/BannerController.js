const { bannerService } = require("../services");
const mongoose = require("mongoose");

const createBanner = async (req, res) => {
    try {
        console.log(req.body);

        const responce = await bannerService.createBannerService(req.body);
        return res.status(200).json({
            success: true,
            message: "successfully created banner"
        })
    } catch (error) {
        console.log("error to create banner", error);
        return res.status(500).json({
            success: false,
            message: "error to create banner"
        })
    }
}

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid banner ID" });
    }

    const updatedBanner = await bannerService.updateBannerService(id, req.body);

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: updatedBanner
    });

  } catch (error) {
    console.error("error to update banner", error);
    return res.status(500).json({
      success: false,
      message: "error to update banner, message - " + error
    });
  }
};

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;  
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid banner ID" });
        }
        const responce = await bannerService.deleteBannerService({ _id: id });
        if (responce.deletedCount === 0) {
            return res.status(404).json({ message: "Banner not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Banner deleted successfully"
        });
    } catch (error) {
        console.error("error to delete banner", error);
        return res.status(500).json({       
            success: false,
            message: "error to delete banner, message - " + error
        });
    }
};

const getAllBanner = async (req, res) => {
    try {
        const responce = await bannerService.findAllBannerdata();
        return res.status(200).json({
            success: true,
            message: "successfully get data",
            responce
        })
    } catch (error) {
        console.error("error to get banner data in controller")
        return res.status(500).json({
            success: false,
            message: "Error to get banner data",
            error
        })
    }
}
module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    getAllBanner
}