import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Box, Button, TextField
} from '@mui/material';
import { Trash } from 'lucide-react';
import { useCreateProductMutation, useGetAllProductsQuery, useDeleteProductMutation } from '../../store/services/productApi';
import { toast } from 'react-toastify';
import { AddTaskOutlined } from '@mui/icons-material';
import { useState } from 'react';

export default function BasicTable() {
  const { data: getAllProducts, error, isLoading } = useGetAllProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const [formData, setFormData] = useState({
    product_name: '',
    points: '',
    remarks: ''
  });
  const [deleteProduct] = useDeleteProductMutation();

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
    if (!formData.product_name || !formData.points) return;

    try {
      await createProduct({
        ...formData,
        points: parseInt(formData.points, 10),
      }).unwrap();
      setFormData({
        product_name: '',
        points: '',
        remarks: '',

      });
      toast.success('Successfully Added!')
    } catch (err) {
      console.error('Failed to create product:', err);
      toast.error('Something went Wrong !')
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <>
      {/* Input form */}
      <Box display="flex" gap={5} p={5} component={Paper} mb={2} alignItems="center">
        <TextField
        
          label="Product Name"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
        />
        <TextField
          label="Points"
          name="points"
          type="number"
          value={formData.points}
          onChange={handleChange}
        />
        <TextField
          label="Remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          sx={{ width: '700px' }} // adjust as needed: 300px, 100%, or '25ch', etc.
  multiline
  maxRows={4}
        />

        <Button   onClick={handleSubmit} disabled={isCreating} sx={{color:'orange'}} >
          {isCreating ? 'Saving...' : <AddTaskOutlined/>}
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No.</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllProducts?.data?.map((product, index) => (
              <TableRow key={product.product_id}>
                <TableCell>{index + 1}</TableCell>
<TableCell>
  {new Date(product.date_created_At).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}
</TableCell>
                <TableCell>{product.created_by_username}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.points}</TableCell>
                <TableCell>{product.remarks}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(product.product_id)} color="error">
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
