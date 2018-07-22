#include <windows.h>
#include <fstream>

LRESULT CALLBACK WindowsCallback(HWND window, UINT message, WPARAM, LPARAM);

struct Bitmap {
     BITMAPINFOHEADER header;
     RGBQUAD palette[2];
};

static Bitmap bitmap;

static VOID *pixels=   0;
static int width=      0;
static int height=     0;
static int zoom=       8;
static HBITMAP handle= NULL;

static char filename[MAX_PATH] = {0};

static void LoadBitmapFile();
static void UnloadBitmap();

int WINAPI WinMain(HINSTANCE instance, HINSTANCE, LPSTR command, int state)
{
     WNDCLASSEX settings;
     ZeroMemory(&settings, sizeof(WNDCLASSEX));

     settings.cbClsExtra=    NULL;
     settings.cbSize=        sizeof(WNDCLASSEX);
     settings.cbWndExtra=    NULL;
     settings.hbrBackground= (HBRUSH)COLOR_BACKGROUND;
     settings.hCursor=       LoadCursor(NULL, IDC_ARROW);
     settings.hIcon=         NULL;
     settings.hIconSm=       NULL;
     settings.hInstance=     instance;
     settings.lpfnWndProc=   (WNDPROC)WindowsCallback;
     settings.lpszClassName= "View Window Class";
     settings.lpszMenuName=  NULL;
     settings.style=         CS_HREDRAW|CS_VREDRAW;

     if (!RegisterClassEx(&settings)) {

          int result= GetLastError();
          MessageBox(NULL,
                     "Window class registration failed",
                     "Registration",
                     MB_ICONERROR);
          ExitProcess(result);
     }

     DWORD style= WS_OVERLAPPEDWINDOW;
     RECT rectangle= {0, 0, 256, 256};
     AdjustWindowRect(&rectangle, style, FALSE);
     HWND window= CreateWindowEx(NULL, "View Window Class", "View",
                                 style, 200, 200, 
                                 rectangle.right - rectangle.left, 
                                 rectangle.bottom - rectangle.top,
                                 NULL, NULL, instance, NULL);

     if (!window) {

          int result= GetLastError();
          MessageBox(NULL, "Window creation failed", "Creation", MB_ICONERROR);
          ExitProcess(result);
     }

     ShowWindow(window, state);

     MSG message;
     ZeroMemory(&message, sizeof(MSG));

     strcpy_s(filename, command);

     int quote= '\"';
     if (command[0] == quote) {

          char* end= strchr(&command[1], quote);
          if (end) {
               strncpy_s(filename, &command[1], end - &command[1]);
          }
     }

     LoadBitmapFile();

     while(GetMessage(&message, NULL, 0, 0)) {

          TranslateMessage(&message);
          DispatchMessage(&message);
     }

     UnloadBitmap();

     return 0;
}

static int RoundUp(int number, int multiple)
{
     return ((number + multiple - 1) / multiple) * multiple;
}

static void LoadBitmapFile()
{
     UnloadBitmap();

     std::ifstream file(filename);
     if (file.is_open()) {

          char header[8];
          std::streamsize previous= file.width(sizeof(header));
          file >> header;
          if (strcmp(header, "BITMAP") == 0) {
          
               file >> width >> height;
          
          } else {

               MessageBox(NULL,
                          "Not a valid BITMAP file",
                          "File error",
                          MB_ICONERROR);
          }

          if (width > 0 && height > 0) {
               int padded= RoundUp(width, 32);
               int stride= padded / 8;

               bitmap.header.biSize=          sizeof(BITMAPINFOHEADER);
               bitmap.header.biWidth=         padded;
               bitmap.header.biHeight=        -height;
               bitmap.header.biPlanes=        1;
               bitmap.header.biBitCount=      1;
               bitmap.header.biCompression=   BI_RGB;
               bitmap.header.biSizeImage=     height * stride;
               bitmap.header.biXPelsPerMeter= 1024;
               bitmap.header.biYPelsPerMeter= 1024;
               bitmap.header.biClrUsed=       2;
               bitmap.header.biClrImportant=  2;
               bitmap.palette[0].rgbRed=      0x00;
               bitmap.palette[0].rgbGreen=    0x00;
               bitmap.palette[0].rgbBlue=     0x00;
               bitmap.palette[1].rgbRed=      0xFF;
               bitmap.palette[1].rgbGreen=    0xFF;
               bitmap.palette[1].rgbBlue=     0xFF;

               handle= CreateDIBSection(NULL, (BITMAPINFO*)&bitmap, DIB_RGB_COLORS, &pixels, NULL, 0);

               unsigned char * poke= (unsigned char*)pixels;
               for (int line= 0; line < height; ++line) {
                    
                    const int inputs= RoundUp(width, 8) / 8;
                    for (int column= 0; column < stride; ++column) {
                         
                         int byte= 0;
                         if (column < inputs) {
                         
                              file >> std::hex >> byte;
                              byte&= 0xFF;
                         }
                         poke[line * stride + column]= byte;
                    }
               }
          
          } else {

               MessageBox(NULL,
                    "Invalid bitmap size",
                    "File error",
                    MB_ICONERROR);
          }
     
     } else {

          char message[80];
          sprintf_s(message, "File '%s' not found", filename);
          MessageBox(NULL,
               message,
               "File error",
               MB_ICONERROR);
     }
}

static void UnloadBitmap()
{
     if (handle) {
          
          DeleteObject(handle);
          handle= NULL;
          width= 0;
          height= 0;
     }
}

static void Paint(HWND window)
{
     PAINTSTRUCT information;
     HDC device= BeginPaint(window, &information);
     if (pixels) {
         
          RECT rectangle;
          GetClientRect(window, &rectangle);
          
          struct {
               int x;
               int y;
               int width;
               int height;
          } output;
          
          output.width= width * zoom;
          output.height= height * zoom;
          output.x= ((rectangle.right - rectangle.left) - output.width) / 2;
          output.y= ((rectangle.bottom - rectangle.top) - output.height) / 2;
          
          StretchDIBits(device, output.x, output.y, output.width, 
                        output.height, 0, 0, width, height, pixels, 
                        (BITMAPINFO*)&bitmap, DIB_RGB_COLORS, SRCCOPY);
     }
     EndPaint(window, &information);
}

LRESULT CALLBACK WindowsCallback(HWND window, UINT message, WPARAM p1, LPARAM p2)
{
     bool processed= false;
     bool invalidate= false;

     switch(message) {

     case WM_KEYUP:
          switch (p1) {

          case VK_F5:
               LoadBitmapFile();
               processed= true;
               invalidate= true;
               break;

          case VK_ADD:
               if (zoom < 16) {

                    zoom*= 2;
                    invalidate= true;
               }
               processed = true;
               break;

          case VK_SUBTRACT:
               if (zoom > 1) {

                    zoom/= 2;
                    invalidate= true;
               }
               processed= true;
               break;
          }
          if (invalidate) {
               InvalidateRect(window, NULL, TRUE);
          }
          break;

     case WM_PAINT:
          if (GetUpdateRect(window, NULL, TRUE)) {
               
               Paint(window);
          }
          processed= true;
          break;

     case WM_DESTROY:
          PostQuitMessage(0);
          processed= true;
          break;
     }

     return (processed)? 0 : DefWindowProc(window, message, p1, p2);
}
