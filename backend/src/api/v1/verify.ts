import { Router } from "express";
import { AdminRequest, DeveloperRequest, OperationsTeamRequest, UserRequest } from "../../types/types";
import { verfiyUser } from "../../middleware/verifyUser";
import { verfiyOperationsTeam } from "../../middleware/verifyOperationsTeam";
import { verfiyAdmin } from "../../middleware/verifyAdmin";
import { verfiyDeveloper } from "../../middleware/verifyDeveloper";

const verify = Router();

verify.get("/customer",
    verfiyUser,
    (req: UserRequest, res) => {
        if (req.userId) {
            return res.status(200).json({ verified: true });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
);

verify.get("/ot",
    verfiyOperationsTeam,
    (req: OperationsTeamRequest, res) => {
        if (req.otId) {
            return res.status(200).json({ verified: true });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
);

verify.get("/admin",
    verfiyAdmin,
    (req: AdminRequest, res) => {
        if (req.adminId) {
            return res.status(200).json({ verified: true });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
);

verify.get("/dev",
    verfiyDeveloper,
    (req: DeveloperRequest, res) => {
        if (req.devId) {
            return res.status(200).json({ verified: true });
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
);

export default verify;