import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('newsletter')
@Controller('newsletter')
export class NewsletterController {
  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to the newsletter' })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Иван Иванов' },
        email: { type: 'string', example: 'ivan@example.com' },
        message: { type: 'string', example: 'Искам да помогна!' }
      },
      required: ['email', 'name']
    }
  })
  @ApiCreatedResponse({ description: 'The subscription has been successfully processed.' })
  async subscribe(@Body() body: any) {
    // For now, we just log the data and return a success response
    console.log('Newsletter Subscription:', body);
    return {
      success: true,
      message: 'Благодарим ви за абонамента! Ще се свържем с вас скоро.',
      data: body
    };
  }
}

