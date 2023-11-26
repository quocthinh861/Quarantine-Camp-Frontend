import Table, { AvatarCell, SelectColumnFilter } from '../components/Table'
import React, { useEffect } from 'react'
import { Button } from '../components/Button'
import supabase from '../client/SuperbaseClient'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Home() {
  const [products, setProducts] = React.useState([])
  const session = useSession();
  console.log("session", session)


  const handleDelete = async (row) => {
    confirm('Are you sure you want to delete this product?')
    if (!confirm) return

    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', row.original.id)

    if (error) {
      console.log(error)
      return
    }

    const updatedProducts = products.filter(
      (product) => product.id !== row.original.id,
    )
    setProducts(updatedProducts)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*')
        console.log("data", data)

        const updatedProducts = data.map((product) => {
          // calculate discount percentage
          const discountPercentage = product.sale_price > 0 && product.sale_price < product.price
          ? parseFloat(((product.price - product.sale_price) / product.price * 100).toFixed(2))
          : 0;
        
  
          // get image url
          const { data } = supabase.storage
            .from('images')
            .getPublicUrl(product.thumbnail_image)
          return {
            ...product,
            discounted_price: discountPercentage,
            imgUrl: data.publicUrl,
          }
        })
  
        setProducts(updatedProducts)
      } catch (error) {
        console.log("error", error)
        return
      }
    }
    fetchProducts()
  }, [])

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Product Name',
        accessor: 'name',
        Cell: AvatarCell,
        imgAccessor: 'imgUrl',
      },
      {
        Header: 'Desciption',
        accessor: 'description',
      },
      {
        Header: 'Price',
        accessor: (row) => `${row.price} VND`,
      },
      {
        Header: 'Discount',
        accessor: 'discounted_price',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: ({ value }) => `${value}%`,
      },
      {
        Header: 'Action',
        accessor: 'delete',
        Cell: ({ row }) => (
          <Button onClick={() => handleDelete(row)} className={`text-red-500`}>
            Delete
          </Button>
        ),
      },
    ],
    [products],
  )

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Link href="/patient">
          <Button className="text-blue-500">Add New Patient</Button>
        </Link>
      </div>
      {/* <Table columns={columns} data={products} /> */}
    </>
  )
}
