import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

interface RequestDataType {
  to: string;
  from: string;
}

const RequestList = ({ reqdata, openprop, onClose, RequestLoading }: any) => {
  const [Backdropopen, SetBackdropopen] = useState(false);

  const open = openprop;
  const handleClose = () => {
    onClose();
  };

  const acceptreq = async (option: RequestDataType) => {
    try {
      SetBackdropopen(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}/acceptreq`,
        option,
        { withCredentials: true }
      );
      handleClose();
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      SetBackdropopen(false);
    } catch (error) {
      console.error(error);
      SetBackdropopen(false);
    }
  };

  const rejectreq = async (option: RequestDataType) => {
    try {
      SetBackdropopen(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}/rejectreq`,
        option,
        { withCredentials: true }
      );
      handleClose();
      toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      SetBackdropopen(false);
    } catch (error) {
      console.error(error);
      SetBackdropopen(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#ffc174', zIndex: theme.zIndex.drawer + 2 })}
        open={Backdropopen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#0D0F12",
            color: "#e3e2e5",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundImage: "radial-gradient(circle at top right, rgba(245, 158, 11, 0.08), transparent 70%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <div className="flex flex-col p-6 min-h-[360px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center text-[#ffc174]">
                <GroupAddIcon className="!text-[18px]" />
              </div>
              <h2 className="text-lg font-bold text-white">Friend Requests</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <CloseIcon className="!text-[20px]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 py-4">
            {RequestLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <CircularProgress size={32} sx={{ color: "#ffc174" }} />
                <p className="mt-3 text-xs text-[#94A3B8]">Loading requests...</p>
              </div>
            ) : reqdata && reqdata.length > 0 ? (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {reqdata.map((i: RequestDataType, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#181B21] border border-white/[0.06] hover:border-white/[0.1] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#292a2c] flex items-center justify-center font-bold text-[#ffc174] text-xs">
                        {i.from.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{i.from}</h3>
                        <p className="text-[11px] text-[#94A3B8]">wants to join your circle</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => acceptreq(i)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-all active:scale-95"
                      >
                        <CheckIcon className="!text-[14px]" /> Accept
                      </button>
                      <button
                        onClick={() => rejectreq(i)}
                        className="px-3 py-1.5 rounded-lg bg-[#292a2c] hover:bg-red-500/20 text-[#94A3B8] hover:text-red-400 border border-white/[0.06] text-xs font-medium transition-all active:scale-95"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#181B21] flex items-center justify-center text-[#64748B] mb-2">
                  <GroupAddIcon className="!text-[24px]" />
                </div>
                <h3 className="text-sm font-semibold text-white">No Pending Requests</h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  You're all caught up! Search for members above to send connection requests.
                </p>
              </div>
            )}
          </div>
        </div>
      </Dialog>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default RequestList;