import { Controller, OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { EmailService } from '../../emailsender/email.service';
import { ProductMeasuerement } from 'src/product/domain/value-objects/product.measurement';
import { ImageUrlGenerator } from '../../image.url.generator/image.url.generator';

@Controller()
export class RabbitMQConsumerService<T> implements OnModuleInit {
  constructor(private readonly emailService: EmailService) {}

  onModuleInit() {
    //console.log('RabbitMQ Consumer Service initialized');
  }

  @EventPattern('productCreatedEvent')
  async handleProductCreated(@Payload() data: T, @Ctx() context: RmqContext) {
    const productData = {
      productName: data['name']._name, 
      productDescription: data['description']._description, 
      productImage: data['images'][0]._image, 
      productPrice: data['price']._price, 
      productCurrency: data['currency']._currency, 
      productStock: data['stock']._stock, 
      productMeasurement: data['measurement']._measurement,
      productWeight: data['weight']._weight,
    }

    const htmlContent = `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #fff; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 30px 0;">
        <tr>
            <td align="center">
                <table width="500" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 30px; text-align: center; max-width: 500px;">
                    <!-- Title Section -->
                    <tr>
                        <td style="background-color: #f46400; color: #fff; padding: 20px; border-radius: 5px 5px 0 0; text-align: center;">
                            <h2 style="margin: 0; font-size: 24px;">¡Checa este nuevo producto 😱!</h2>
                        </td>
                    </tr>
                    
                    <!-- Product Name -->
                    <tr>
                        <td style="padding: 20px 0;">
                            <h2 class="title" style="font-size: 24px; font-weight: 600; color: #f46400; margin: 0 0 15px 0;">${productData.productName.toString()}</h2>
                        </td>
                    </tr>
                    
                    <!-- Product Description -->
                    <tr>
                        <td style="padding: 0 30px;">
                            <p class="description" style="font-size: 16px; color: #414046; line-height: 1.5; margin: 0 0 20px 0;">${productData.productDescription}</p>
                        </td>
                    </tr>
                    
                    <!-- Price -->
                    <tr>
                        <td style="padding: 0 30px;">
                            <p class="price" style="font-size: 18px; font-weight: 500; color: #f46400; margin: 0 0 15px 0;">${productData.productPrice} ${productData.productCurrency}</p>
                        </td>
                    </tr>
                    
                    <!-- Product Image -->
                    <tr>
                        <td style="padding: 20px;">
                            <a href="https://res.cloudinary.com/dzlemrxcs/image/upload/${productData.productImage}" style="text-decoration: none;">
                                <img src="https://res.cloudinary.com/dzlemrxcs/image/upload/${productData.productImage}" alt="Product Image" style="width: 200px; height: auto; border-radius: 5px;">
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Category and Stock -->
                    <tr>
                        <td style="padding: 0 30px;">
                            <p style="font-size: 16px; color: #414046; line-height: 1.5; margin: 0;">Encuentrelo en su presentacion de ${productData.productWeight} ${productData.productMeasurement}</p>
                            <p style="font-size: 16px; color: #414046; line-height: 1.5; margin: 5px 0 20px 0;">Stock disponible: ${productData.productStock}</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; font-size: 0.8em; color: #999; text-align: center;">
                            <p style="margin: 0;">Go Dely App ${new Date().toLocaleDateString()} ©. All rights reserved.</p>
                            <p style="margin: 0;">Descarga nuestra app en tu plataforma favorita :D</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    await this.emailService.sendMail(
      'der2600@gmail.com', // Replace with the actual recipient's email
      'Nuevo Producto Agregado a Go Dely App',
      htmlContent,
    );
  }

  @EventPattern('orderCreatedEvent')
  async handleOrderCreated(@Payload() data: T, @Ctx() context: RmqContext) {
    console.log('Order created event received', data);
    const orderData = {
      orderId: data['id']._id,
      orderCreatedDate: data['createdDate']._createdDate,
      orderStatus: data['status']._status,
      orderAddress: data['address']._address,
      orderProducts: data['products']._products,
      orderCombos: data['combos']._combos,
      orderPaymentMethod: data['paymentMethod']._paymentMethod,
      orderUserId: data['userId']._userid,
      orderUserEmail: data['userEmail']._email,
    }
    
    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Created</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #fff; margin: 0; padding: 0;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 30px 0;">
            <tr>
                <td align="center">
                    <table width="500" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 30px; text-align: center; max-width: 500px;">
                        <!-- Title Section -->
                        <tr>
                            <td style="background-color: #f46400; color: #fff; padding: 20px; border-radius: 5px 5px 0 0; text-align: center;">
                                <h2 style="margin: 0; font-size: 24px;">¡Nueva Orden Creada!</h2>
                            </td>
                        </tr>
                        
                        <!-- Order ID -->
                        <tr>
                            <td style="padding: 20px 0;">
                                <h2 class="title" style="font-size: 24px; font-weight: 600; color: #f46400; margin: 0 0 15px 0;">Orden ID: ${orderData.orderId}</h2>
                            </td>
                        </tr>
                        
                        <!-- Order Details -->
                        <tr>
                            <td style="padding: 0 30px;">
                                <p class="description" style="font-size: 16px; color: #414046; line-height: 1.5; margin: 0 0 20px 0;">Fecha de Creación: ${orderData.orderCreatedDate}</p>
                                <p class="description" style="font-size: 16px; color: #414046; line-height: 1.5; margin: 0 0 20px 0;">Estado: ${orderData.orderStatus}</p>
                                <p class="description" style="font-size: 16px; color: #414046; line-height: 1.5; margin: 0 0 20px 0;">Dirección de envio: ${orderData.orderAddress}</p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 30px; font-size: 0.8em; color: #999; text-align: center;">
                                <p style="margin: 0;">Go Dely App ${new Date().toLocaleDateString()} ©. All rights reserved.</p>
                                <p style="margin: 0;">Descarga nuestra app en tu plataforma favorita :D</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    await this.emailService.sendMail(
        data['userEmail']._email,
        'Nueva Orden Creada Go Dely App',
        htmlContent,
      );
  }

  @EventPattern('orderUpdatedEvent')
  async handleOrderUpdated(@Payload() data: T, @Ctx() context: RmqContext) {
    console.log('Order updated event received', data);
    const orderData = {
      orderId: data['id']._id,
      orderCreatedDate: data['createdDate']._createdDate,
      orderStatus: data['status']._status,
      orderAddress: data['address']._address,
      orderProducts: data['products']._products,
      orderCombos: data['combos']._combos,
      orderPaymentMethod: data['paymentMethod']._paymentMethod,
      orderUserId: data['userId']._userid,
    }
    
    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Created</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #fff; margin: 0; padding: 0;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5; padding: 30px 0;">
            <tr>
                <td align="center">
                    <table width="500" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 30px; text-align: center; max-width: 500px;">
                        <!-- Title Section -->
                        <tr>
                            <td style="background-color: #f46400; color: #fff; padding: 20px; border-radius: 5px 5px 0 0; text-align: center;">
                                <h2 style="margin: 0; font-size: 24px;">¡Tu orden se ha actualizado!</h2>
                            </td>
                        </tr>
                        
                        <!-- Order ID -->
                        <tr>
                            <td style="padding: 20px 0;">
                                <h2 class="title" style="font-size: 24px; font-weight: 600; color: #f46400; margin: 0 0 15px 0;">Orden ID: ${orderData.orderId}</h2>
                            </td>
                        </tr>
                        
                        <!-- Order Details -->
                        <tr>
                            <td style="padding: 0 30px;">
                                <p class="description" style="font-size: 16px; color: #414046; line-height: 1.5; margin: 0 0 20px 0;">Fecha de Creación: ${orderData.orderCreatedDate}</p>
                                <p class="description" style="font-size: 16px; color: #414046; line-height: 1.5; margin: 0 0 20px 0;">Estado: ${orderData.orderStatus}</p>
                                <p class="description" style="font-size: 16px; color: #414046; line-height: 1.5; margin: 0 0 20px 0;">Dirección de envio: ${orderData.orderAddress}</p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px 30px; font-size: 0.8em; color: #999; text-align: center;">
                                <p style="margin: 0;">Go Dely App ${new Date().toLocaleDateString()} ©. All rights reserved.</p>
                                <p style="margin: 0;">Descarga nuestra app en tu plataforma favorita :D</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    await this.emailService.sendMail(
        data['userEmail']._email,
        'Orden Actualizada Go Dely App',
        htmlContent,
      );
  }
}