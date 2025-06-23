import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button,
  Box,
  TextField,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { Trash } from 'lucide-react';
import { useDeleteCouponWithQuantityMutation, useGenerateCouponMutation, useGetAllCouponsWithQuantityQuery } from '../../store/services/coupon';
import { toast } from 'react-toastify';
import { useState } from 'react';
import AddTaskOutlined from '@mui/icons-material/AddTaskOutlined';
import { useGetAllProductsQuery } from '../../store/services/productApi';

export default function BasicTable() {
  const { data:getAllProducts}=useGetAllProductsQuery();
  const { data: getAllCouponsWithQuantity } = useGetAllCouponsWithQuantityQuery();
  const [deleteProduct] = useDeleteCouponWithQuantityMutation();
  const [generateCoupons, { isLoading: isCreating }] = useGenerateCouponMutation();
  const [formData, setFormData] = useState({
    product_id: '',
    product_name: '',
    remarks: '',
    quantity: ''
  });
  const handleDelete = async (product_id) => {
    try {
      await deleteProduct(product_id).unwrap();
      toast.success('SuccesFully Deleted!')
    } catch (err) {
      console.error('Failed to delete product:', err);
      toast.error('Unable to delete !')
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {

    try {
await generateCoupons({ 
  ...formData, 
  quantity: parseInt(formData.quantity) 
}).unwrap();
  setFormData({
  product_id: '',
  product_name: '',
  remarks: '',
  quantity: ''
});

      toast.success('Successfully Added!')
    } catch (err) {
      console.error('Failed to create Coupon:', err);
      toast.error('Something went Wrong !')
    }
  };
  return (
    <>
     <Box display="flex" gap={5} p={5} component={Paper} mb={2} alignItems="center">
            
            <FormControl sx={{ minWidth: 200 }}>
  <InputLabel id="product-label">Product Name</InputLabel>
 <Select
  labelId="product-label"
  id="product-select"
  name="product_id"
  value={formData.product_id}
  label="Product Name"
  sx={{ width: '300px' }}
  onChange={(e) => {
    const product_id = parseInt(e.target.value);
    const selectedProduct = getAllProducts?.data?.find(p => p.product_id === product_id);
    setFormData(prev => ({
      ...prev,
      product_id,
      product_name: selectedProduct?.product_name ,
    }));
  }}
>
  {getAllProducts?.data?.map((product) => (
    <MenuItem key={product.product_id} value={product.product_id}>
       {product.product_name}
    </MenuItem>
  ))}
</Select>

</FormControl>

           
             <TextField
              label="Quantity"
              name="quantity"
              type='number'
              value={formData.quantity}
              onChange={handleChange}
            />
            <TextField
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              sx={{ width: '600px' }} // adjust as needed: 300px, 100%, or '25ch', etc.
      multiline
      maxRows={4}
            />
    
            <Button   onClick={handleSubmit} disabled={isCreating} sx={{color:'orange'}} >
              {isCreating ? 'Saving...' : <AddTaskOutlined/>}
            </Button>
          </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllCouponsWithQuantity?.data?.map((coupon, index) => (
              <TableRow key={coupon.coupon_history_id}>
                <TableCell>{index + 1}</TableCell>
<TableCell>
  {new Date(coupon.date_created_At).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}
</TableCell>
                <TableCell>{coupon.created_by_username}</TableCell>
                <TableCell>{coupon.product_name}</TableCell>
                <TableCell>{coupon.quantity}</TableCell>
                <TableCell>{coupon.points}</TableCell>
                <TableCell>{coupon.remarks}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(coupon.coupon_history_id)} color="error"
                  >
                    <Trash size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
