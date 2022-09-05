import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ALL_BRANDS } from '../../shared/graphql/query/brandQuery';
import { Brands_Insert_Input, Models } from '../../shared/graphql/__generate__/generated';
import * as styled from './styled'
type Model = {
    models: Models[]
}
type Brands = Pick<Brands_Insert_Input, 'id' | 'name'> & Model

interface IFormInput {
    brand: number;
    model: number
}
const ViewCreateCar = () => {
    const { data, loading, error } = useQuery(ALL_BRANDS);
    const { register, handleSubmit } = useForm<IFormInput>()
    const [brands, setBrands] = useState<Brands[]>()
    const [models, setModels] = useState<Models[]>()

    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

    useEffect(() => {
        if (data) {
            setBrands(data.brands);
            setModels(data.brands[0].models);
        }
    }, [data])

    //console.log(data)
    //console.log(brands)
    const handleChangeBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const model = brands?.filter(item => (item.id)?.toString() === event.target.value)[0].models
        console.log(model)
        //console.log(model)
        setModels(model)
    }

    return (
        <styled.Container>
            <styled.RegisterContainer>
                <styled.Title>Create Car</styled.Title>
                <styled.Form onSubmit={handleSubmit(onSubmit)}>
                    <styled.EntryGroup>
                        <styled.HeaderOption>Select Brand</styled.HeaderOption>
                        <styled.Select  {...register("brand")} onChange={handleChangeBrand}>
                            {
                                brands &&
                                brands.map((item, id) => {
                                    return (
                                        <styled.Option value={item.id ? item.id : 0} key={id}>{item.name}</styled.Option>
                                    )
                                })
                            }
                        </styled.Select>
                    </styled.EntryGroup>
                    <styled.EntryGroup>
                        <styled.HeaderOption>Select Model</styled.HeaderOption>
                        <styled.Select  {...register("model")} >
                            {
                                models &&
                                models.map((item, id) => {
                                    return (
                                        <styled.Option value={item.id ? item.id : 0} key={id}>{item.name}</styled.Option>
                                    )
                                })
                            }
                        </styled.Select>
                    </styled.EntryGroup>
                    <input type="submit" />
                </styled.Form>
            </styled.RegisterContainer>
        </styled.Container>
    )
}

export default ViewCreateCar